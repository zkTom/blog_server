var express = require('express');
var router = express.Router();
var sql = require('../util/mysql');
let error = require('./config')
let CategoryController = require('../controller/CategoryController.js');
let baseUrl='http://localhost:3001';

// 一级分类添加页面
router.get('/showCategory', CategoryController.showCategoryView);
// 一级分类数据添加
router.post('/addCategory',CategoryController.addCategory);
// 一级分类获取
router.get('/getCategoryList',CategoryController.getCategoryList);
// 二级分类数据页面
router.get('/showSubCategory',CategoryController.showSubCategoryView);
// 二级分类数据添加
router.post('/addSubCategory',CategoryController.addSubCategory);
// 二级分类获取
router.get('/getSubCategoryList',CategoryController.getSubCategoryList);
module.exports=router;