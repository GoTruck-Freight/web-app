// driver.model.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  trucktype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
