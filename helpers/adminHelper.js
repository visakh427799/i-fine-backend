const user= require('../models/userModel');
const profile=require('../models/profileModel')
const doctor = require('../models/doctorModel')
const mongoose=require('mongoose')

module.exports={
getAllUsers:()=>{
    return new Promise((resolve,reject)=>{
         user.find({}).then((dat)=>{
             console.log(dat);
             resolve(dat)
         }).catch((err)=>{
             console.log(err);
         })
    })
 },
 getAllDoctors:()=>{
    return new Promise((resolve,reject)=>{
         doctor.find({}).then((dat)=>{
             console.log(dat);
             resolve(dat)
         }).catch((err)=>{
             console.log(err);
         })
    })
 },
 getUserDetails:(uid)=>{
    return new Promise((resolve,reject)=>{
        // let uid=mongoose.Types.ObjectId(id)
        // console.log(uid);
        user.findOne({_id:uid}).then((dat1)=>{
            profile.findOne({user_id:uid}).then((dat2)=>{


                let obj={dat1,dat2}
               
                resolve(obj)
            })
          
        }).catch((err)=>{

            console.log(err);
            reject()
        })
   })
 }
}