const mongoose = require('mongoose')
const { Schema } = mongoose

const PricingSchema = new Schema({
      // truckType: String,
      baseFare: {
            type: Number,
            default: 1
      },
      farePerKilometer: {
            type: Number,
            default: 1
      },
      farefiftyKilometer: {
            type: Number,
            default: 1
      },
      fareHundredKilometer: {
            type: Number,
            default: 1
      },
      fareTwoHundredKilometer: {
            type: Number,
            default: 1
      },
      fareThreeHundredKilometer: {
            type: Number,
            default: 1
      },
      fareFourHundredKilometer: {
            type: Number,
            default: 1
      },
      percentRange: {
            type: Number,
            default: 1
      },
      comeBack: {
            type:  Number,
            default: 0.06
      },
      comeBackMaxPercent: {  
            type  : Number,
            default : 30
    },

});
module.exports = new mongoose.model('pricing', PricingSchema)