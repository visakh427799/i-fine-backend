const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new mongoose.Schema({
 
    name:String,
    description:String,
    prize:Number,
    drug_type:String,
    
    
  
});
const medicine = mongoose.model("medicine", medicineSchema);
module.exports = medicine;



