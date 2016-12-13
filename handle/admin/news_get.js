var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common.js');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    var findObj = {};
    if (args._id) {
        findObj._id = Number(args._id);
    }

	common.db.collection('zz_news').find(findObj).toArray(function(err, info) {
		var msg = {};

        if (err) {
        	msg.err = 1;
        } else {
        	msg.result = info;
        }

        endcb(msg);
    });

};

module.exports = {
	'handle': handle
};