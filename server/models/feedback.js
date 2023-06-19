const mongoose = require('mongoose')
const { Schema } = mongoose

const FeedbackSchema = new Schema({ 
      name: String,
      number: Number,
      question: String,
      date: Date

  });

  module.exports = new mongoose.model('feedback', FeedbackSchema)