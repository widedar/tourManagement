const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  cin:String,
  name: String,
  email:String,
  password:String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = UserModel;
