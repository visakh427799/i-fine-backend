const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const certificateSchema=new Schema({
    
 certificate_name:String,
 user_id:String,
 certificate_url:String,
 date_uploaded:String,
 certificate_viewed:Boolean,



})
const certificate= mongoose.model('certificate',certificateSchema);
module.exports=certificate;