const Type=require('./message.js');
var ArticleDao=require('../dao/articleDao.js');
var util = require('../util/dom.js');
let baseUrl='http://localhost:3001';
function showArticleView(req,res){
	res.render('article')
}
function getArticleList(req, res){
    ArticleDao.getArticleList().then(data => {
    	if (data.length===0) {
    		return res.send({
    			code:1,
    			type:Type.NO_DATA,
    			article_list:[],
    			message:'暂时没有数据'
    		})
    	}
        // 处理文字缩略词
        data.forEach(function(item,index,array){
            if (!item.url) item.url=util.findImg(item.content);
            item.content=util.delHtmlTag(item.content).substring(0,100).concat('...');
            item.create_time=util.formatDate(item.create_time);
        })
        res.status(200).json({
            code: 1,
            article_list: data
        })
    }).catch(err => {
    	console.log(err)
    	res.send({
    		code:0,
    		type:Type.INTERNAL_ERROR,
    		message:'内部错误'
    	})
    })
}
function getArticle(req,res) {
    var article_id=req.params.id;
    if (!article_id) {
        return res.json({
            code:0,
            type:Type.ERROR_PARAMS,
            message:'参数错误'
        })
    }
    //存在或不存在
    ArticleDao.getArticle(article_id).then(data => {
        if (data.length===1) {
            data[0].create_time=util.formatDate(data[0].create_time);
            return res.json({
                code:1,
                article:data[0]
            }) 
        }
        res.status(404).json({
            code:0,
            type:Type.NO_DATA,
            message:'没有找到该文章'
        })
        
    }).catch(err => {
        console.log(err)
        res.json({
            code:0,
            type:Type.INTERNAL_ERROR,
            message:'内部错误'
        })
    })

}
function addArtilce(req,res,next){
	// TODO
    ArticleDao.addArticle({
        title: request.body.title,
        create_time: new Date(),
        content: request.body.content,
        cover_status:1,
    }).then((res) => {
        return imageDao.addImage({
            img_name: file.originalname,
            url: baseUrl+'/cover/'+file.filename,
            article_id: data.insertId
        })
    }).then((res) => {
        response.json({ status: 'success' })
    }).catch(err => {
        response.send(error(500, 'Interal Error'))
    })
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
}


module.exports={
	getArticleList,
    getArticle
}