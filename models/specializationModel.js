const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specializationSchema = new mongoose.Schema({
    specialization_type:String,
    specialization_diseases:[],

    doctors:[]
  
  
});
const  specialization= mongoose.model("specialization", specializationSchema);
module.exports = specialization ;
