const express = require('express');
const Volrouter = express.Router();
const VolModel = require('../models/Vol');
const DestinationModel = require('../models/Destination');
const { verifyAdmin } = require('../utils/verifytoken');


Volrouter.get('/', async (req, res, next) => {
  try {
    const vols = await VolModel.find().populate('destination');
    res.status(200).json(vols);

  } catch (error) {
    next(error);
  }
});


Volrouter.post('/',verifyAdmin, async (req, res, next) => {
  try {
    const { volNumber,datedepart, dateretour,classe, aller, arriver } = req.body;

    
    let destination = await DestinationModel.findOne({ aller,arriver });

 
    if (!destination) {
      destination = new DestinationModel({
        aller: aller ,
        arriver: arriver 
      });
      await destination.save();
    }

    
    const newVol = new VolModel({
      volNumber,
      datedepart,
      dateretour,
      classe:classe,
      destination: {
        aller:destination.aller,
        arriver:destination.arriver,

      } 
    });

    
    await newVol.save();

    res.redirect('/vols');
  } catch (error) {
    next(error);
  }
});


Volrouter.put('/:id',verifyAdmin, async (req, res, next) => {
  try {
    const volId = req.params.id;
    const updatedVol = req.body;

   
    const vol = await VolModel.findByIdAndUpdate(volId, updatedVol, { new: true });

    if (!vol) {
      return res.status(404).send('Vol not found');
    }

    res.json(vol);
  } catch (error) {
    next(error);
  }
});


Volrouter.delete('/:id',verifyAdmin, async (req, res, next) => {
  try {
    const volId = req.params.id;

   
    const vol = await VolModel.findByIdAndDelete(volId);

    if (!vol) {
      return res.status(404).send('Vol not found');
    }

    res.json(vol);
  } catch (error) {
    next(error);
  }
});

module.exports = Volrouter;
