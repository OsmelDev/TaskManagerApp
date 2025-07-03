const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    password: { type: String, require},
    email: { type: String, require, unique: true },
    name: { type: String },
    lastName:{type:String},
  }, {
  timestamps:true, 
})

module.exports = mongoose.model("User", userSchema);