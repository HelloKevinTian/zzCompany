/**
 *  上传图片
 */
var logger = require('ss-logger').getLogger(__filename);

function handle(clientip, args, endcb, req, res) {
	var fname = req.files.imgFile.path.replace("public\\upload\\", "").replace("public/upload/", "");
	var url = '/upload' + fname.substr(fname.lastIndexOf('/'), fname.length);
	var info = {
		"error": 0,
		"url": url
	};
	res.send(info);
};

/**
 * 导出对象
 */
module.exports = {
	'handle': handle
};