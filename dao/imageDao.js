const sql = require('../util/mysql')


function addImage({img_name,url,article_id,is_cover}) {
    return new Promise((resolve,reject) => {
        let str = 'insert into image(img_name,url,article_id,is_cover) values (?,?,?,?)'
        sql(str,[img_name,url,article_id,is_cover],(err,data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}
module.exports.addImage=addImage