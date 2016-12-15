var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common.js');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    if (!args._id) {
        endcb({
            err: 1
        })
        return;
    }

    common.db.collection('zz_news').remove({
        _id: Number(args._id),
    }, function(err) {
        var msg = {};
        if (err) {
            msg.err = 1;
            endcb(msg);
            return;
        }

        common.db.collection('zz_news').find({}).toArray(function(err, info) {
            if (err) {
                msg.err = 1;
            } else {
                msg.result = info;
            }

            endcb(msg);
        });
    });

};

module.exports = {
    'handle': handle
};