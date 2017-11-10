const sql = require('../util/mysql')


function addArticle({title,create_time,content,cover_status}) {
    return new Promise((resolve,reject) => {
        let arr=[title,create_time,content,cover_status]
        let str = 'insert into article(title,create_time,content,cover_status) values (?,?,?,?)'
        sql(str,arr,(err,data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
function getArticleList(){
    return new Promise((resolve,reject) => {
        let str = 'select art.article_id,art.title,art.content,art.create_time,img.url from article art left join image img '+
        'on art.article_id=img.article_id';
        sql(str,[], (err,data) => {
        if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}
function getArticle(article_id){
    return new Promise((resolve,reject) => {
        let str = 'select art.article_id,art.title,art.content,art.create_time,img.url from article art left join image img on '+
        'art.article_id=img.article_id where art.article_id=?';
        let arr=[article_id];
        sql(str,arr,(err,data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports={
    addArticle,
    getArticleList,
    getArticle
}