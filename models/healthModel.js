const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const healthSchema = new mongoose.Schema({
  user_id:String,
  certificates:[
      {
          
      cerificate_name:String,
      date_uploaded:Date,
      

          
      }
  ],

  self_check:[
      {
          self_check_id:String,
          answer:Boolean,
          date_attended:Date,
      }
  ]
  
  
  
});
const health = mongoose.model("health", healthSchema);
module.exports = health;
