const Type = require('./message.js')
let UserDao = require('../dao/userDao.js')

function isLogin(req, res) {
    if (req.cookies.user_id) {
        return res.json({ code: 1, message: '您已经登录过了' })
    }
    res.json({ code: 1, type: Type.NOT_LOGIN, message: '您还没有登陆过，请先登录' })
}

function login(req, res) {
    let username = req.body.name;
    let password = req.body.password;
    try {
        if (!username || !password) {
            throw new Error('login() :参数错误')
        }
        if (!username.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            throw new Error('login() :邮箱格式错误')
        }
    } catch (err) {
        console.log(err.message, err);
        res.send({
            status: 0,
            type: Type.ERROR_PARAMS,
            message: '参数错误'
        })
        return
    }
    UserDao.getUserInfo(req.body.name, req.body.password).then(data => {
        if (data.length===0) {
            res.status(200).json({
                code: 0,
                type: Type.NOT_REGISTED,
                message: '您还没有注册'
            })
            return
        }
        res.cookie('user_id', data[0].user_id, { maxAge: 1000 * 60 * 60 });
        res.status(200).json({
            code: 1,
            user: data[0]
        })
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            code: 0,
            type: Type.INTERNAL_ERROR,
            message: '内部错误'
        })
    })
}


module.exports = {
    isLogin,
    login
}
