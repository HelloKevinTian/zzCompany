var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common.js');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

	common.db.collection('zz_news').find({}).toArray(function(err, info) {
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