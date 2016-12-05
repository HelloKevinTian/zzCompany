/**
 *  后台入口
 *  url: '/admin'
 */
function handle(clientip, args, endcb, req, res) {
	// 加载web界面
	if (!req.session.user) {
		res.render('login');
	} else {
		res.render('admin');
	}
};

/**
 * 导出对象
 */
module.exports = {
	'handle': handle
};