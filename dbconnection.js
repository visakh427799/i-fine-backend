const mongoose = require('mongoose')
//const url="mongodb+srv://visakhts:427799@cluster0.70uir.mongodb.net/<social>?retryWrites=true&w=majority"
const url=process.env.MONGO_LOCAL;
console.log(url)
console.log(url)
mongoose.connect(url, {useNewUrlParser: true},(err)=>{
    if(!err) return console.log("MongoDB connected");
    else{
        console.log(err);
    }
});