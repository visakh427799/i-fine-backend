var express = require('express');
var router = express.Router();
const user = require('../models/userModel');
const userHelper = require('../helpers/userHelper');
const profile = require('../models/profileModel');
const adminHelper = require('../helpers/adminHelper');
const doctor = require('../models/doctorModel')
const certificate=require('../models/certificateModel')
const specialization=require('../models/specializationModel')
const chat =require("../models/chatModel")
//get routes
router.get('/', (req, res) => {
  res.send("Good to go ")
})
//post routes 
//login route
router.post('/signin', (req, res) => {
  console.log(req.body);
  userHelper.doSignin(req.body).then((id) => {
    // console.log("Password correct");
    res.json({ "success": true, "u_id": id });
  }).catch((err) => {
    res.json({ "success": false });
  })
})
//signup route
router.post('/signup', (req, res) => {
  
  userHelper.doSignup(req.body).then((id) => {
    // console.log("Password correct");
    res.json({ "success": true, "user_id": id });
  }).catch((err) => {
    res.json({ "success": false });
  })
})

router.post('/complete-profile', (req, res) => {
  console.log("c-profile");
  userHelper.completeProfile(req.body).then((id) => {
    // console.log("Password correct");
    res.json({ "success": true });
  }).catch((err) => {
    res.json({ "success": false });
  })
})






//admin
router.get('/admin/getAllUsers',(req,res)=>{
  adminHelper.getAllUsers().then((data)=>{
     res.json({"success":true,"data":data});
  }).catch((err)=>{
     res.json({"success":false});
  })
})

//admin
router.get('/admin/getAllDoctors',(req,res)=>{
  adminHelper.getAllDoctors().then((data)=>{
     res.json({"success":true,"data":data});
  }).catch((err)=>{
     res.json({"success":false});
  })
})

router.post('/admin/getUserDetails',(req,res)=>{
  console.log(req.body);
    adminHelper.getUserDetails(req.body.u_id).then((data)=>{
     res.json({"success":true,"data":data});
  }).catch((err)=>{
     res.json({"success":false});
  })
})



router.post('/photo-upload', (req, res) => {
  // console.log(req.files.myFile)
  console.log(req.body.url);
  console.log(req.body.u_id);
  // let myImg = req.files.myFile;
 
  // myImg.mv(`${__dirname}/../user_images/${myImg.name}.jpg`)
  //   .then(() => {
     
      profile.findOneAndUpdate(
        { user_id:req.body.u_id},
        {photo:req.body.url },
        { useFindAndModify: false }
      ).then((dat)=>{
         if(dat){
           res.json({success:true})
         }
         else{
          res.json({ success: false })
         }
      }).catch((err)=>{
        console.log(err);
      })
    
  //   .catch((err) => {
  //     console.log(err);
  //     res.json({ success: false, err: err })

  //   })
})

router.post('/doctor-photo-upload', (req, res) => {
  // console.log(req.files.myFile)
  console.log(req.body.url);
  console.log(req.body.d_id);
  // let myImg = req.files.myFile;
 
  // myImg.mv(`${__dirname}/../user_images/${myImg.name}.jpg`)
  //   .then(() => {
     
      doctor.findOneAndUpdate(
        { _id:req.body.d_id},
        {photo:req.body.url },
        { useFindAndModify: false }
      ).then((dat)=>{
         if(dat){
           res.json({success:true})
         }
         else{
          res.json({ success: false })
         }
      }).catch((err)=>{
        console.log(err);
      })
    
  //   .catch((err) => {
  //     console.log(err);
  //     res.json({ success: false, err: err })

  //   })
})

router.post('/admin/addDoctor',(req,res)=>{
  console.log(req.body.doctor);
  let obj=req.body.doctor;
  doctor.create(obj).then((dat)=>{
    if(dat){

      specialization.findOne({specialization_type:obj.specialization}).then((s)=>{
         let dts=[...s.doctors]
         dts.push(dat._id)
          specialization.findOneAndUpdate({specialization_type:obj.specialization},  
        {doctors:dts },
        { useFindAndModify: false }).then((u)=>{
           res.json({success:true,doctor_id:dat._id})

        }).catch((err)=>{
          res.json({success:false})

        })
      }).catch((err)=>{
        res.json({success:false})

      })
     
     
     
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
  })



})

router.post('/admin/deleteDoctor',(req,res)=>{
  console.log(req.body.doctor_id);
  console.log(req.body.doctor_id);
  doctor.deleteOne({_id:req.body.doctor_id}).then((dat)=>{
    if(dat){
      res.json({success:true})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
  })



})


router.post('/admin/addSpecialization',(req,res)=>{
  console.log(req.body);
  let obj={
    
      specialization_type:req.body.spec,
      specialization_diseases:req.body.personName,
      doctors:[]
  };
  specialization.create(obj).then((dat)=>{
    if(dat){
      res.json({success:true})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
  })



})

router.post('/findDoctors',(req,res)=>{
  specialization.find(
    {specialization_diseases: {$in:req.body.personName} }


  ).then((resp)=>{
    console.log(resp);
     
    let dctrs=[];

    resp.map((dat)=>{
      dctrs.push(...dat.doctors)
    })
    console.log(dctrs);

    doctor.find({_id:{$in:dctrs}}).then((data)=>{
      res.json({success:true,data:data})
    }).catch(()=>{
      res.json({success:false})
    })


  })
})

router.get('/getAllSpecializations',(req,res)=>{
    specialization.find({}).then((resp)=>{
      if(resp){
        res.json({success:true,data:resp})
      }
      else{
        res.json({success:false})
      }
    })
})

router.post('/getAllCertificates',(req,res)=>{

  certificate.find({user_id:req.body.u_id}).then((d)=>{
    if(d){
      res.json({success:true,data:d})
       console.log(d);
    }
    else{
      console.log("inside");
      res.json({success:false})
    }

  }).catch((err)=>{
    console.log(err);
    res.json({success:false})
  })
    
})

router.post("/uploadCertificate",(req,res)=>{
  console.log(req.body);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const todayDate=today.toDateString();

  let obj={
    certificate_name:"",
    user_id:req.body.u_id,
    certificate_url:req.body.url,
    date_uploaded:todayDate,
    certificate_viewed:false,
  }
 
  certificate.create(obj).then((resp)=>{
    if(resp){
      res.json({success:true})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
  })
})

router.post('/getDoctorBySpec',(req,res)=>{
  console.log(req.body.spec); 
  doctor.find({specialization:req.body.spec}).then((data)=>{
    res.json(({success:true,data:data}))
  }).catch(()=>{
    res.json({success:false})
  })
})

router.post('/getChats',(req,res)=>{

    chat.findOne({user_id:req.body.u_id,doctor_id:req.body.doctor_id}).then((dat)=>{
    if(dat){
     
      res.json(({success:true,data:dat}))
    }
    else{
      res.json(({success:false}))

    }
  })


})
router.post('/sendMessage',(req,res)=>{
   


  chat.findOne({user_id:req.body.u_id,doctor_id:req.body.doctor}).then((dat)=>{
    if(dat){
    //  console.log(dat);

     let arr=[...dat.chats];
     console.log(arr);

     let usrMsg={
      msg_time:"1-8-2022",
      msg_text:req.body.message,
      is_user:true,
    }
    
  
  
    
    arr.push(usrMsg)
    
  
    chat.findOneAndUpdate({user_id:req.body.u_id,doctor :req.body.doctor},{chats:arr},{ useFindAndModify: false }).then((d)=>{
     if(d){
      res.json(({success:true}))
     }
    })
         


      // res.json(({success:true,data:dat}))
    }
    else{
      let usrMsg={
        msg_time:"1-8-2022",
        msg_text:req.body.message,
        is_user:true,
      }
      
    
    
      let chatArray=[]
      chatArray.push(usrMsg)
       let obj={
            user_id:req.body.u_id,
            doctor_id:req.body.doctor,
            chats:chatArray,
    
       }
    
      chat.create(obj).then((d)=>{
       if(d){
        res.json(({success:true}))
       }
      })
    
    }
  })


  

})

router.post('/doctor/doctor-signin',(req,res)=>{

  doctor.findOne({email:req.body.email}).then((dat)=>{
    if(dat){
      res.json({success:true,d_id:dat._id})
    }
  })
    
})

router.post('/doctor/getDoctorDetails',(req,res)=>{
  doctor.findOne({_id:req.body.d_id}).then((d)=>{
    res.json({success:true,dtr:d})
  })
})


router.post('/sendMessage-user',(req,res)=>{
   


  chat.findOne({user_id:req.body.doctor,doctor_id:req.body.d_id}).then((dat)=>{
    if(dat){
    //  console.log(dat);

     let arr=[...dat.chats];
     console.log(arr);

     let usrMsg={
      msg_time:"1-8-2022",
      msg_text:req.body.message,
      is_user:false,
    }
    
  
  
    
    arr.push(usrMsg)
    
  
    chat.findOneAndUpdate({user_id:req.body.doctor,doctor :req.body.d_id},{chats:arr},{ useFindAndModify: false }).then((d)=>{
     if(d){
      res.json(({success:true}))
     }
    })
         


      // res.json(({success:true,data:dat}))
    }
    else{
      let usrMsg={
        msg_time:"1-8-2022",
        msg_text:req.body.message,
        is_user:true,
      }
      
    
    
      let chatArray=[]
      chatArray.push(usrMsg)
       let obj={
            user_id:req.body.u_id,
            doctor_id:req.body.doctor,
            chats:chatArray,
    
       }
    
      chat.create(obj).then((d)=>{
       if(d){
        res.json(({success:true}))
       }
      })
    
    }
  })


  

})


module.exports = router;

