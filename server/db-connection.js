  // getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  const connectionString = "mongodb+srv://KapitanNemo:quliyev234789@cluster0.cvuwtaz.mongodb.net/GoTruck"//process.env.MONGODB_CONNECTION_STRING 
  await mongoose.connect(connectionString);
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
