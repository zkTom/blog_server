const express = require('express');
const router = express.Router();
const sql = require('../util/mysql');
const error = require('./config')
let Article = require('../controller/ArticleController.js');
let ImageDao = require('../dao/imageDao');
let ArticleDao = require('../dao/articleDao');
let Type = require('../controller/message.js')
let baseUrl='http://localhost:3001';
let upload=require('../util/multer.js');

// 获取文章列表
router.get('/', (req,res) => res.render('article'))
router.get('/getArticleList',Article.getArticleList)
router.get('/:id',Article.getArticle)
router.post('/', upload.single('cover'), function(req, res, next) {
	let body = req.body;
	let file =req.file;
    console.log(file)
    let cover_status= file?1:0;
    //判断 文章标题，内容，不为空
    try{
	    if (!body.title || !body.content) {
	    	throw new Error('addArticle() :参数错误')
	    }
	    if (body.title.length === 0 && body.content.length === 0) {
	    	throw new Error('addArticle() :参数错误')
	    }
	}catch(err){
		console.log(err)
    	res.send({
    		code:0,
    		type:Type.ERROR_PARAMS,
    		message:'参数错误'
    	})
    	return
	}
    ArticleDao.addArticle({
        title: body.title,
        create_time: new Date(),
        content: body.content,
        cover_status:cover_status,
    }).then((data) => {
        return ImageDao.addImage({
            img_name: file.originalname,
            url: baseUrl+'/cover/'+file.filename,
            article_id: data.insertId,
            is_cover:1,
        })
    }).then((data) => {
        res.json({
        	code:1
        })
    }).catch(err => {
    	console.log(err)
        res.send({
        	code:0,
        	type:Type.INTERNAL_ERROR,
        	message:'内部错误'	
        })
    })
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
});

//多附件上传
//注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名
router.post('/mulUpload', upload.array('photos', 12), function(req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    console.log(req.files);
    console.log(req.body);
    //res.end(req.file + "<br/><br/>" + req.body);
    res.render('success')
})

module.exports = router
