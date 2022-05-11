const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
 
    user_id:String,
    doctor_id:String,
    
    chats:[
        {
           
         msg_time:String,
         msg_text:String,
         is_user:Boolean,
                
           
            
        }
    ]
    
  
});
const chat = mongoose.model("chat", chatSchema);
module.exports = chat;



