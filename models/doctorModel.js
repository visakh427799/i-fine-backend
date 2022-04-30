const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new mongoose.Schema({
 
    name:String,
    specialization:String,
    experience:Number,
    gender:String,
    phone:Number,
    email:String,
    patients:Array,
    appointments:Array,
    
  
});
const doctor = mongoose.model("doctor", doctorSchema);
module.exports = doctor;



