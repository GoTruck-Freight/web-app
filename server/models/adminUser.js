// Import necessary modules
const mongoose = require('mongoose');

// Define the schema for admin user
const adminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});

// Create and export the AdminUser model
module.exports = mongoose.model('AdminUser', adminUserSchema);
