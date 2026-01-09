const express=require('express');
const router=express.Router();

const authControl=require('../controllers/authcontrol');
router.post('/login',authControl.login);

module.exports=router;