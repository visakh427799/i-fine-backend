const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.APIKEY);
const mongoose= require('mongoose')

const user= require('../models/userModel');
const profile= require("../models/profileModel")
 
// const post =require("../models/postModel")
const otpGenerator= require('../utils/otpGenerator')

module.exports={

doSignin:(dat)=>{
  let data=dat;
console.log(data);
  return new Promise((resolve,reject)=>{

    user.findOne({email:data.email,password:data.password}).then((resp)=>{
     if(resp){
       console.log("inside");
       resolve(resp._id)
     }
     else{
       reject()
     }

    }).catch((err)=>{
     
       reject(err)
    })

  })
   

},

doSignup:async(data)=>{
  
  console.log(data);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
   const todayDate=today.toDateString();

console.log(todayDate);
  let obj={
    name:data.name,
    email:data.email,
    password:data.password,
    Date_joined:todayDate,
    email_verified:false,
    otp:"",
    token:"",
    phone:data.phone
  }
  return new Promise((resolve,reject)=>{

       user.findOne({email:data.email}).then((dat)=>{
         if(dat){
           reject()
         }
         else{
           user.create(obj).then((d)=>{
             if(d){
               resolve(d._id)
             }
             else{
               reject()
             }
           }).catch((err)=>{
             console.log(err);
             reject()
           })
         }
       })
  }).catch((err)=>{
    reject()
  })
   

},

completeProfile:(data)=>{


   let prof=data.profile;
   let state=data.st;
   let country=data.country;
   let u_id=data.u_id;

   let obj={
    user_id:u_id,
    country: country,
    state: state,
    district:prof.district,
    place:prof.place,
    gender:prof.gender,
    height:prof.height,
    weight:prof.weight,
    age:prof.age,
    bmi:0,
    photo:"",
   }


   return new Promise((resolve,reject)=>{

    profile.create(obj).then((dat)=>{
      if(dat){
        resolve()
      }
      else{
        reject()
      }
    }).catch((err)=>{
       reject()
    })
})
  
  
},


  
    
    otpVerify:async(usr)=>{

      return new Promise((resolve,reject)=>{
        console.log(usr.email)

        user.findOne({email:usr.email}).then((res)=>{
          console.log(res.otp);
          console.log(usr.otp);

          if(res.otp===usr.otp){

            user.findOneAndUpdate(
              {_id:res._id },
              { email_verified : true },
              { useFindAndModify: false }).then((resp)=>{
                if(resp){
                  resolve(res._id)
                }
                else{
              reject(2)
                  
                }
              })

            
          }
          else{
            reject(1)
          }
        }).catch((err)=>{
            reject(2)
        })

      })
  
    },
    addPassword:(pass,user_id)=>{
      console.log(pass,user_id);
    return new Promise((resolve,reject)=>{

       if(pass&&user_id){
         
      
      user.findOneAndUpdate(
          { _id: user_id },
          {password:pass.pass1 },
         
          { useFindAndModify: false }
        ).then((dat)=>{
          if(dat){
            console.log(dat)
            user.findOneAndUpdate(
              { _id: user_id },
              {steps:1 },
              { useFindAndModify: false }
            ).then((dat)=>{
              if(dat){
                console.log(dat)
                resolve()
              }
              else{
                reject()
              }
            }).catch((err)=>{
              reject()
            })
    
           
          }
          else{
            reject()
          }
        }).catch((err)=>{
          console.log(err);
        })


       }
       else{
         reject()
       }

    })

    },
    findPogress:(dat)=>{
      // console.log(uid)
        let uid=dat.uid;

      return new Promise((resolve,reject)=>{
        if(uid){
          user.findOne({_id:uid}).then((usr)=>{
            console.log(usr.steps);
            resolve(usr.steps)
  
           }).catch(()=>{
             reject()
           })
        
        }
        else{
          reject()
        }

         
      })
    },


  
}