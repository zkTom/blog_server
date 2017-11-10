const sql = require('../util/mysql')


function addArticle({ title, create_time, content }) {
    return new Promise((resolve, reject) => {
        let str = 'insert into article(title,create_time,content) values (?,?,?)'
        sql(str, [title, create_time, content], (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function getUserList() {
    return new Promise((resolve, reject) => {
        let str = 'select * from `user`';
        sql(str, [], (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

function getUserInfo(name, password) {
    return new Promise((resolve, reject) => {
        let str = 'select * from `user` where username=? and password=?';
        let arr = [name, password];
        sql(str, arr, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}
module.exports={
    getUserInfo,
    getUserList
}
