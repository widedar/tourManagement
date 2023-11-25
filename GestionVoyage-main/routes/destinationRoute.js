const express=require('express');
const destinationrouter=express.Router();
const mongoose = require('mongoose');

const destinationSchema=new mongoose.Schema({
   
    aller:String,
    arriver:String,
});

const DestinationModel=mongoose.model('Destination',destinationSchema);


destinationrouter.get('/', async (req, res, next) => {
    try {
      const getDestination = await DestinationModel.find();
      res.json(getDestination);
    } catch (error) {
      next(error);
    }
  });

  module.exports=destinationrouter;