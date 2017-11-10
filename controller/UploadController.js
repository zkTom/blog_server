var ImageDao = require('../dao/imageDao.js');
var Type = require('./message.js');
var fs = require('fs');
var path = require('path');
var Busboy = require('busboy');
let baseUrl = 'http://localhost:3001';


function singleUpload(req, res, next) {
    var busboy = new Busboy({ headers: req.headers });
    var data={img_name:"",url:"",article_id:0,is_cover:0},img_url;
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var directory = path.join(process.cwd(), '/public/cover1/')
        fs.existsSync(directory) || fs.mkdir(directory);
        file.pipe(fs.createWriteStream(directory + path.basename(filename)));
        img_url = baseUrl + '/cover1/' + path.basename(filename);
        data.url=img_url;
        data.img_name=filename;
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + val);
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.status(200).json({code: 1, url: img_url });
    });
    return req.pipe(busboy);
}
    // if (!file) return res.json({
    //     code:0,
    //     type:Type.INTERNET_ERROR,
    //     message:'网络错误'
    // })
    // ImageDao.addImage(data).then(data => {
//             if (data.length === 1) {
//                 res.status(200).json({
//                     code: 1,
//                     url: data[0].url
//                 })
//             }
//         }).catch(err => {
//             console.log(err)
//             res.json({
//                 code: 0,
//                 type: Type.INTERNAL_ERROR,
//                 message: '内部错误'
//             })
//         })    


module.exports = {
    singleUpload
}
