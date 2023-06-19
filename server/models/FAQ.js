const mongoose = require('mongoose')
const { Schema } = mongoose

// landing model index pagenin medelidi 
const FaqSchema = new Schema({ 
      question: String,
      answer: String,
  });

  module.exports = new mongoose.model('faq', FaqSchema)