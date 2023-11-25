
const mongoose = require('mongoose');

const Reservation=require('./Reservation');
const ticketSchema = new mongoose.Schema({
    reservation:
     { /*type: mongoose.Schema.Types.ObjectId, 
      ref: 'Reservation' */
      user:{
        name:{
          type:String,
          required:true
        }
      },
      vol:{
        volNumber:{
          type:String,
          required:true,
        },
        classe:
        {
          type:String,
        
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
},
    seatNumber: String,
    Gate:String,
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  
  });
  
  const TicketModel = mongoose.model('Ticket', ticketSchema);
  module.exports=TicketModel;