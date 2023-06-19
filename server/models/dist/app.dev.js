"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema; // landing model index pagenin medelidi 

var AppSchema = new Schema({
  Roads: {
    number: String,
    name: String,
    factor: Number
  }
});
var app = mongoose.model('app', AppSchema); // run();
// async function run (){
//     const app1 = new app({
//         name: 'Tesla'
//     })
//     await app1.save()
// }
// app.countDocuments({}, function (err, count) {
//     if (err){
//         console.log(err)
//     }
//     else {
//         console.log(count)
//     }
//   });

module.exports = new mongoose.model('app', AppSchema);