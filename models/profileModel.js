const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema({
  user_id:String,
  country: String,
  state: String,
  district:String,
  place:String,
  age:String,
  gender:String,
  height:String,
  weight:String,
  bmi:Number,
  photo:String,
  
  
});
const profile = mongoose.model("profile", profileSchema);
module.exports = profile;
