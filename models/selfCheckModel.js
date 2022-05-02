const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selfCheckSchema = new mongoose.Schema({
 
    assesment:[
        {

         disease_type:String,
         date_uploaded:Date,
         questions:[
             

         ],
         answers:[
           
         ]
         



        }
    ]
  
  
});
const selfCheck = mongoose.model("selfCheck", selfCheckSchema);
module.exports = selfCheck;