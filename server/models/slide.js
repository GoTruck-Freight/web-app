const mongoose = require('mongoose')
const { Schema } = mongoose

const SlideSchema = new Schema({
    redtitleone: String,
    titleone: String,
    textone: String,
    redtitletwo: String,
    titletwo: String,
    texttwo: String,
    redtitlethree: String,
    titlethree: String,
    textthree: String,
  });

  module.exports = new mongoose.model('slide', SlideSchema)