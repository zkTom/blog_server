const express=require('express');
const router=express.Router();
const sql=require('../util/mysql');
const error = require('./config')


router.get('/',(req, res)=>{
    res.render('register');
})
//处理注册用户
router.post('/',(req, res, next)=>{
    let username=req.body.name;
    let password=req.body.password;
    if (!username || !password) res.send(error(400, '参数错误'));
    if (!username.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) res.send(error(400, '邮箱格式错误'))
    let str='INSERT INTO User (username,password,create_time) VALUES (?,?,?)';
    let arr = [req.body.name, req.body.password, new Date()];
    sql(str,arr,(err,data)=>{
        if (err || !data) res.send(error(500, '内部错误'))
        res.status(200).json({
            status:"success",
            data:{
                user_id:data.insertId
            }
        })

    });
});
module.exports=router;
