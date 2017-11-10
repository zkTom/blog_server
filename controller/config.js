/*
* 抛出错误
* @param {number} status 状态码
* @param {string} msg    报错信息
* **/
module.exports= function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}
