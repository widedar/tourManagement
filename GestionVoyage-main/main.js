
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const cookieParser = require('cookie-parser');


const userrouter = require('./routes/userRoute');
const destinationrouter = require('./routes/destinationRoute');
const Volrouter = require('./routes/volRoute');
const reservationRouter = require('./routes/reservationRoute');
const ticketRouter = require('./routes/ticketRoute');
const authRouter = require('./routes/authentificationRouter');



const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));


app.use(express.json());

app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/destination', destinationrouter);
app.use('/vols', Volrouter);
app.use('/reservations', reservationRouter);
app.use('/tickets', ticketRouter);




app.use('/auth', authRouter);

app.use('/users', userrouter);



app.get('/destination',(req,res)=>{
  console.log('destinations ')
});
app.get('/tickets',(req,res)=>{
 console.log('tickets created');
});


app.get('/vols-form',(req,res)=>
{
  //if (req.session && req.session.user) {
    res.render('Add/addvols');
  //} else {
    //res.redirect('/login');
  }
);


app.get('/make-reservation',(req,res)=>
{
  
    res.render('Add/addreservation');
  
  
});


app.get('/register', (req, res) => {
  
    res.render('Add/addusers');
  
  
});

app.get('/vols', (req, res) => {
  
  res.json('vols');


});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
