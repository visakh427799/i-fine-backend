var express = require('express');
var router = express.Router();
const user = require('../models/userModel');
const userHelper = require('../helpers/userHelper');
const profile = require('../models/profileModel');
const adminHelper = require('../helpers/adminHelper');
const doctor = require('../models/doctorModel')
const specialization=require('../models/specializationModel')
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



module.exports = router;
