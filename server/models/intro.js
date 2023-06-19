const mongoose = require('mongoose')
const { Schema } = mongoose

const IntroSchema = new Schema({ 
      title: String,
      text: String,
  });

  module.exports = new mongoose.model('intro', IntroSchema)