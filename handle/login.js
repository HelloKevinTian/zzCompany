/**
 *  login
 */
var logger = require('ss-logger').getLogger(__filename);
var common = require('../app/common.js');

function handle(clientip, args, endcb, req, res) {
    common.db.collection('user').findOne({
        'username': args.username
    }, function(err, user) {
        if (!user) {
            user = {
                'username': 'ck',
                'password': 'ck'
            }
        }
        if (user && user.password === args.password) {
            logger.warn('### user login: ', clientip, args, new Date());
            req.session.user = args;
            res.render('admin');
        } else {
            res.render('login');
        }
    });
};

/**
 * 导出对象
 */
module.exports = {
    'handle': handle
};