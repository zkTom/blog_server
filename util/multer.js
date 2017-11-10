
/**
 * multer上传文件的相关配置
 */
var multer = require('multer');
var path   = require('path');
var fs     = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var coverPath = path.join(process.cwd(),'./public/cover')
        fs.existsSync(coverPath) || fs.mkdirSync(coverPath)
        cb(null, coverPath)
    },
    filename: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})
let fileFilter = function (req,file,cb){
    // 当设置这个判断后  没允许的 && 没设置的类型 拒绝
    if(file.mimetype === 'image/gif' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' 
        || file.mimetype === 'image/bmp'){
        cb(null,true)
    }else{
        //req.upload = '123';
        cb(null,false)
    }
};
var upload = multer({ 
    storage: storage,
    limits:{
        // 限制上传文件的大小
    },
    fileFilter:fileFilter
});
module.exports = upload