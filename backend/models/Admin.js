const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  Adminname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}
);

module.exports = mongoose.model('Admin', adminSchema,'Admin');
