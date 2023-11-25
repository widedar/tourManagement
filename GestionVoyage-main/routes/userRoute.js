const express = require('express');
const userrouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { verifyUser, verifyAdmin } = require('../utils/verifytoken');


const userSchema = new mongoose.Schema({
  cin:String,
  name: String,
  email: String,
  password: String,
  role:String
});

const UserModel = mongoose.model('User', userSchema);


// Apply the checkVerify middleware to protect the routes


userrouter.get('/',verifyAdmin,async (req, res, next) => {
  try {
    const Users = await UserModel.find();
    res.render('users', { users: Users });
  } catch (error) {
    next(error);
  }
});

/*userrouter.post('/', async (req, res, next) => {
  try {
    const {cin,name, email, password} = req.body;

    if (!cin||!name || !email || !password) {
      return res.status(400).json({ error: 'Le champ "name" est requis.' });
    }

    const newUser = new UserModel({ cin,name,email,password });
    await newUser.save();

    res.redirect('/users');
  } catch (error) {
    next(error);
  }
});*/

userrouter.put('/:cin',verifyUser, async (req, res, next) => {
  try {
    const userCin = req.params.cin;
    const updatedFields = req.body;

    const user = await UserModel.findOneAndUpdate({ cin: userCin }, updatedFields, { new: true });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});


userrouter.delete('/:cin', verifyUser,async (req, res, next) => {
  try {
    const userCin = req.params.cin;

    const user = await UserModel.findOneAndDelete({ cin: userCin });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userrouter;
