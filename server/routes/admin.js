const express = require('express');
const router = express.Router();
const Doctors = require('../models/doctors');
const Appointments = require('../models/appointments');


/*
*GET/
*HOME
*/

router.get('/admin', async (req,res)=>{
  
  try{

    const locals = {
        title:"Admin",
        description:"Simple"
      }

    res.render('admin/index', {locals });
  } catch(error){
    console.log(error);
  }
})




module.exports = router;
