var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common.js');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

	common.db.collection('info').find({}).toArray(function(err, info) {
		var msg = {};

        if (err) {
        	msg.err = err;
        } else {
        	msg.result = info;
        }

        endcb(msg);
    });
};

module.exports = {
	'handle': handle
};