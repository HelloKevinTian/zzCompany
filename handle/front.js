/**
 *  默认入口
 *  url: '/'
 */
function handle(clientip, args, endcb, req, res) {
	// 加载web界面
	res.render('index');
};

/**
 * 导出对象
 */
module.exports = {
	'handle': handle
};