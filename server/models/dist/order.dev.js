"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema; // landing model index pagenin medelidi 

var OrderSchema = new Schema({
  number: String,
  name: String,
  payment: Number,
  propasalpayment: Number,
  weight: Number,
  feedback: String,
  date: Date
});
module.exports = new mongoose.model('order', OrderSchema);