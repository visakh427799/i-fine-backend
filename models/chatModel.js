const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
 
    user_id:String,
    
    chats:[
        {
            doctor_id:String,
            user_messages:[
                {
                    msg_time:String,
                    msg_text:String,
                }
            ],
            doctor_messages:[
                {    msg_time:String,
                    msg_text:String,
                }
            ],
            
        }
    ]
    
  
});
const chat = mongoose.model("chat", chatSchema);
module.exports = chat;



