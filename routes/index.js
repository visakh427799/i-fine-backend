var express = require('express');
var router = express.Router();
const user = require('../models/userModel');
const userHelper = require('../helpers/userHelper');
const profile = require('../models/profileModel');
const adminHelper = require('../helpers/adminHelper');
const doctor = require('../models/doctorModel')
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
    res.json({ "success": true, "user_id": id });
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








// router.post('/email-verify', (req, res) => {
//   // console.log(req.body);
//   // res.cookie('otp', '1986', { expires: new Date(Date.now() + 900000), httpOnly: true });

//   userHelper.mailSend(req.body.email).then(() => {
//     res.json({ "success": true })
//   }).catch((val) => {
//     res.json({ "success": false, "val": val })
//   })
// })
// router.post('/otp-verify', (req, res) => {
//   // let email=req.body.email
//   // let otp=req.body.otp
//   console.log(req.body)
//   userHelper.otpVerify(req.body).then((id) => {
//     res.json({ "success": true, "user_id": id })
//   }).catch((dat) => {
//     res.json({ "success": false, "val": dat })
//   })

// })





router.post('/photo-upload', (req, res) => {
  console.log(req.files.myFile)
  let myImg = req.files.myFile;
 
  myImg.mv(`${__dirname}/../user_images/${myImg.name}.jpg`)
    .then(() => {
     
      profile.findOneAndUpdate(
        { user_id:myImg.name},
        {photo:`${myImg.name}.jpg` },
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
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, err: err })

    })
})

router.post('/admin/addDoctor',(req,res)=>{
  console.log(req.body.doctor);
  let obj=req.body.doctor;
  doctor.create(obj).then((dat)=>{
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





module.exports = router;
