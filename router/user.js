/**
 * Created by 17701 on 2017/7/11.
 */
const express=require('express');
const router=express.Router();
const sql=require('../util/mysql');


//查询用户列表
router.get('/',(req,res)=>{
   var str = 'select * from user'
   sql(str,(err, data) => {
       res.json({user_list:data})
   })
});
module.exports=router;
