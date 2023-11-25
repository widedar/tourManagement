const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');


function generateToken(user) {
  const payload = {
    cin: user.cin,
    email: user.email,
    role: user.role, 
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}


authRouter.post('/register', async (req, res, next) => {
  try {
    const { cin, name, email, password, role } = req.body;

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      cin,
      name,
      email,
      password: hashedPassword,
      role, 
    });

    await newUser.save();

   
    const token = generateToken(newUser);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

// Login route
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

   
    const user = await UserModel.findOne({ email });

    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

   
    const token = generateToken(user);
    res.cookie('accessToken',token, {
        httpOnly:true,
        expires:token.expiresIn
    }).status(200).json({success:true,message:'successfully login'});
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
