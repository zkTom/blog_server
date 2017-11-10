const sql = require('../util/mysql')


function addCategory(title,desc) {
    return new Promise((resolve,reject) => {
        let str = 'INSERT INTO `category` (`title`, `desc`) VALUES (?,?)';
        let arr=[title,desc];
        sql(str,arr,(err,data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}
function getCategoryList(){
    return new Promise((resolve,reject) => {
        let str = 'select * from category';
        let arr=[];
        sql(str,arr,(err,data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}
function addSubCategory(title,desc,category_id){
    let str='INSERT INTO sub_category(`title`, `desc`, `parent_id`) VALUES '+
    '(?,?,?)';
    let arr=[title,desc,category_id];
    return new Promise((resolve,reject) => {
        sql(str,arr,(err,data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
    
}
function getSubCategoryList(){
    return new Promise((resolve,reject) => {
        let str = 'select * from sub_category';
        let arr=[];
        sql(str,arr,(err,data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}
exports.addCategory=addCategory;
exports.getCategoryList=getCategoryList;
exports.addSubCategory=addSubCategory;
exports.getSubCategoryList=getSubCategoryList;