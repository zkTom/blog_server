var moment = require('moment');
/**
 * 去除HTML标签的Tag
 * @param  {[string]} str 一段HTML
 * @return {[string]}     去除标签的文字
 */
function delHtmlTag(str){
	if (typeof str !== 'string') return str;
	var reg = new RegExp('<[^>]+>','g');
	return str.replace(reg,'');
}
function findImg(str){
	if (typeof str !== 'string') return str;
	var reg =/<img[\s]+src[\s]*=[\s]*\"([^\"]*?)\"/i;
	var matches=reg.exec(str);
	if (matches) {
		var str = matches[0];
		return str.substring(10,str.length-1);
	}
	return;
}
/**
 * 格式化时间 2017年5月5日
 * @param  {[string]} date 日期字符串
 * @return {[string]}      格式化后的字符串
 */
function formatDate(date){
	return moment(date, "YYYY-MM-DD").format('ll');
}
exports.delHtmlTag=delHtmlTag;
exports.formatDate=formatDate;
exports.findImg=findImg;