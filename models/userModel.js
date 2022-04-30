const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema=new Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String,default:null},
    Date_joined:{type:String},
    email_verified:{type:Boolean,default:false},
    otp:{type:String,default:false},
    token:{type:String,default:null},
    phone:{type:String,default:null}


})
const user= mongoose.model('user',userSchema);
module.exports=user;