const Type=require('./message.js');
var CategoryDao=require('../dao/categoryDao.js');
let baseUrl='http://localhost:3001';
const TITLE_LENGTH=20;
const DESC_LENGTH=60;

// 后台页面
function showCategoryView(req,res){
	res.render('category');
}
// 后台接口
function addCategory(req,res){
	// 处理参数
	let title=req.body.title;
	let desc=req.body.desc;
	if (!title || !desc) {
		return res.status(400).json({
			code:0,
			type:Type.ERROR_PARAMS,
			message:'参数不符'
		})
	}
	if (title.length>TITLE_LENGTH || desc.length>DESC_LENGTH) {
		return res.status(400).json({
			code:0,
			type:Type.PARAMS_EXCEED,
			message:'参数长度不符合'
		})
	}
	// 执行插入操作
	CategoryDao.addCategory(title,desc).then(data => {
		if (data.insertId) {
			res.json({
				code:1
			})
		}
	}).catch(err => {
		console.log(err)
		res.status(500).json({
			code:0,
			type:Type.INTERNET_ERROR,
			message:'网络出错'
		})
	})
}
// 后台+前台接口
function getCategoryList(req,res){
	CategoryDao.getCategoryList().then(data => {
		if (data.length===0) {
    		return res.send({
    			code:1,
    			type:Type.NO_DATA,
    			category_list:[],
    			message:'暂时没有数据'
    		})
    	} else {
    		res.json({
    			code:1,
			category_list:data
    		})
    	}
	}).catch(err => {
		console.log(err)
		res.send({
    		code:0,
    		type:Type.INTERNAL_ERROR,
    		message:'内部错误'
    	})
	});
}
// 后台页面
function showSubCategoryView(req,res){
	CategoryDao.getCategoryList().then(data => {
		if (data.length===0) {
    		return res.render('subcategory',{
    			code:1,
    			type:Type.NO_DATA,
    			category_list:[],
    			message:'暂时没有数据'
    		})
    	} else {
    		res.render('subcategory',{
    			code:1,
				category_list:data
    		})
    	}
	}).catch(err => {
		console.log(err)
		res.render('subcategory',{
    		code:0,
    		type:Type.INTERNAL_ERROR,
    		message:'内部错误'
    	})
	});
}
// 后台添加子分类
function addSubCategory(req,res){
	let category_id = req.body.category_id;
	let title =req.body.title;
	let desc =req.body.desc;
	// 参数过滤
	if (!category_id || !title || !desc) {
		res.json({
			code:0,
			type:Type.ERROR_PARAMS,
			message:'参数错误'
		})
		return
	}
	if (title.length>TITLE_LENGTH || desc.length> DESC_LENGTH) {
		res.json({
			code:0,
			type:Type.PARAMS_EXCEED,
			message:'参数长度不符合'
		})
		return
	}
	CategoryDao.addSubCategory(title,desc,category_id).then(data => {
		if (data.insertId) {
			res.json({
				code:1
			})
		}
	}).catch(err => {
		console.log(err)
		res.status(500).json({
			code:0,
			type:Type.INTERNAL_ERROR,
			message:'网络出错'
		})
	})
}
// 前台+后台获取子分类
function getSubCategoryList(req,res){
	CategoryDao.getSubCategoryList().then(data => {
		if (data.length===0) {
    		return res.send({
    			code:1,
    			type:Type.NO_DATA,
    			category_list:[],
    			message:'暂时没有数据'
    		})
    	} else {
    		res.json({
    			code:1,
			category_list:data
    		})
    	}
	}).catch(err => {
		console.log(err)
		res.send({
    		code:0,
    		type:Type.INTERNAL_ERROR,
    		message:'内部错误'
    	})
	});
}
exports.addCategory=addCategory;
exports.showCategoryView=showCategoryView;
exports.getCategoryList=getCategoryList;
exports.showSubCategoryView=showSubCategoryView;
exports.addSubCategory=addSubCategory;
exports.getSubCategoryList=getSubCategoryList;


