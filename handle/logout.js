/**
 *  logout
 *  url: '/logout'
 */
function handle(clientip, args, endcb, req, res) {
	req.session.user = null;
	res.redirect('/admin');
};

/**
 * 导出对象
 */
module.exports = {
	'handle': handle
};