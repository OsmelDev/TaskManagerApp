const mongoose = require("mongoose")
const { MONGOOSE_CONECT } = require('../config.js')

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }; 
console.log(MONGOOSE_CONECT)
const connectDB = async () =>{
  try {
    await mongoose.connect(MONGOOSE_CONECT, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error) 
  }
 }

module.exports= connectDB