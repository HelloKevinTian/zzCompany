/**
 *  加载web界面
 *  url: '/views/:path'
 */
function handle(clientip, args, endcb, req, res) {
	var path = req.params.path.replace(/_/, '/'); //url路径中第一个下划线替换成斜杠

	if (path.indexOf('admin/') > -1) {
		if (!req.session.user) {
			res.redirect('/admin');
		}
	}
	res.render(path, {
		args: args
	});
};

/**
 * 导出对象
 */
module.exports = {
	'handle': handle
};