const express=require('express');
const router=express.Router();
const sql=require('../util/mysql');
const error = require('./config')
const Admin = require('../controller/AdminController.js')


router.get('/',(req,res)=>{
    res.redirect('/login/isLogin')
});
router.get('/isLogin', Admin.isLogin)
router.post('/',Admin.login);

module.exports=router;
