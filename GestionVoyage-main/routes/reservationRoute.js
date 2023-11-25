const express = require('express');
const reservationRouter = express.Router();
const ReservationModel = require('../models/Reservation');
const UserModel = require('../models/user');
const VolModel = require('../models/Vol');
const DestinationModel = require('../models/Destination');
const TicketModel = require('../models/Tickets');
const ticketRouter = require('./ticketRoute');

//fonction de nombre de reservation generés automatiquement
function generateReservationNumber() {
 
  return Math.random().toString(36).substring(7);
}

//fonction de nombre de place generés automatiquement
const generateSeatNumber = () => {
  return 'Seat' + Math.floor(Math.random() * 100);
};
//fonction de nombre de Gate generés automatiquement
const generateGate = () => {
  return 'Gate' + Math.floor(Math.random() * 10);
};



reservationRouter.post('/', async (req, res, next) => {
  try {
    const { cin, volNumber } = req.body;
 
    
    const userExists = await UserModel.exists({ cin });
    const flightExists = await VolModel.exists({ volNumber });
    //const destinationExists = await DestinationModel.exists({ name: destinationName });

    if (!userExists || !flightExists ) {
      return res.status(404).json({ error: 'User, Flight not found' });
    }
    const user = await UserModel.findOne({ cin });
   
    const vol = await VolModel.findOne({ volNumber }).populate('destination');;

    if (!vol || !vol.destination || !vol.destination.aller || !vol.destination.arriver) {
      return res.status(404).json({ error: 'Invalid Vol data' });
    }
   
    const newReservation = new ReservationModel({
     
      //cin,
      //volNumber,
      destination: {
        aller: vol.destination.aller,
        arriver: vol.destination.arriver,
      },
      reservationNumber: generateReservationNumber(),
      user:{
        //_id:user._id,
        name:user.name,
        cin:user.cin,
      },
      vol:{
        volNumber:vol.volNumber,
        
        destination: {
          aller:vol.destination.aller,
          arriver:vol.destination.arriver,
  
        } ,
        
      },
      
    });

    await newReservation.save();
   
      // Create a new ticket associated with the reservation
      const newTicket = new TicketModel({
         reservation: newReservation,
         seatNumber: generateSeatNumber(),
         Gate: generateGate(),
         date: Date.now(),
        
      });
   
      // Save the new ticket to the database
      await newTicket.save();
   
      res.redirect('/tickets');
   

   
  } catch (error) {
    next(error);
  }
});

reservationRouter.get('/', async (req, res, next) => {
    try {
      
      const reservations = await ReservationModel.find();
      res.render('reservations', { reservations:reservations });
    } catch (error) {
      next(error);
    }
  });

reservationRouter.get('/:cin', async (req, res, next) => {
  try {
    const cin = req.params.cin;
    const reservations = await ReservationModel.find({ cin });
    res.json(reservations);
  } catch (error) {
    next(error);
  }
});


reservationRouter.delete('/:reservationNumber', async (req, res, next) => {
  try {
    const reservationNumber = req.params.reservationNumber;
    const deletedReservation = await ReservationModel.findOneAndDelete({ reservationNumber });

    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(deletedReservation);
  } catch (error) {
    next(error);
  }
});

module.exports = reservationRouter;
