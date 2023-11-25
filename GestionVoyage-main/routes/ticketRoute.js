const express =require('express');
const ticketRouter=express.Router();
const TicketModel = require('../models/Tickets');
const ReservationModel=require('../models/Reservation');


ticketRouter.get('/', async (req, res, next) => {
    try {
      
      const ticket = await TicketModel.find();
  
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
  
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = ticketRouter;