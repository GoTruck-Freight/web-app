const mongoose = require('mongoose')
const { Schema } = mongoose

const RoadSchema = new Schema({
      number: String,
      name: String,
      factor: Number

});
module.exports = new mongoose.model('road', RoadSchema)