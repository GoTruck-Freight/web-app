const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  payment: {
    type: Number,
    required: true,
  },
  minpayment: {
    type: Number,
    required: true,
  },
  maxpayment: {
    type: Number,
    required: true,
  },
  proposalpayment: {
    type: String,
    required: false,
  },
  trucktype: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: false,
  },
  route: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: false,
  },
  status: {
      type: Object, //mongoose.Schema.Types.ObjectId,
      // ref: 'Status'
    },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;