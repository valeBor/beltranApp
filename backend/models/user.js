const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user' // user o admin
  }
});

module.exports = mongoose.model('user', userSchema);