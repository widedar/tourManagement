const mongoose = require('mongoose');
//const user = require('./user');
const vol = require('./Vol');  
const reservationSchema = new mongoose.Schema({
    reservationNumber:String,
    user: {
      /*_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },*/
      name:{
        type: String,
        required: true,
      },
      cin: {
        type: String,
        required: true,
      },
    },
  vol: {
    volNumber:{
      type:String,
      required:true,
    },
    destination: {
      /*type: Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,*/
      aller:{
        
        type:String,
        required:true
      
      },
      arriver:{
        
          type:String,
        required:true
       
      }
    },
      
    }
    /*type:  mongoose.Schema.Types.ObjectId,
    ref: 'Vol',
    required: true,*/
  },
 
  
  
);

const ReservationModel = mongoose.model('Reservation', reservationSchema);

module.exports = ReservationModel;
