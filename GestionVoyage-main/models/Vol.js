
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Destination = require('./Destination'); 

const volSchema = new Schema({
  volNumber:String,
  datedepart:Date,
  dateretour:Date,
  classe:String,
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
});

const VolModel = mongoose.model('Vol', volSchema);

module.exports = VolModel;
