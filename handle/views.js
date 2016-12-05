/**
 *  加载web界面
 *  url: '/views/:path'
 */
function handle(clientip, args, endcb, req, res) {
	var path = req.params.path.replace(/_/, '/'); //url路径中第一个下划线替换成斜杠

	// if (path.indexOf('announcement/') === -1) { //公告url直接跳过登陆认证
	// 	if (!req.session.user) {
	// 		res.redirect('/');
	// 	}
	// }
	// 加载web界面
	res.render(path);
};

/**
 * 导出对象
 */
module.exports = {
	'handle': handle
};