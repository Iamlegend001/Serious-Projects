const mongoose = require('mongoose');


async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to DATABASE")
  } catch (error) {
    console.log("error connecting to DATABASE",error)
  }
}

module.exports = connectDB;