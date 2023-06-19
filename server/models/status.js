// status.model.js
const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
  // driver: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Driver'
  // }
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
