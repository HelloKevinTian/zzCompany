var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common.js');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    if (!args.title || !args.content) {
        endcb({
            err: 1
        })
        return;
    }

    common.genId('zz_work', function(err, gid) {
        var msg = {};
        if (err) {
            msg.err = 1;
            endcb(msg);
            return;
        }
        common.db.collection('zz_work').insert({
            _id: gid,
            title: args.title,
            time: util.formatDate(),
            content: args.content
        }, function(err) {
            if (err) {
                msg.err = 1;
                endcb(msg);
                return;
            }

            common.db.collection('zz_work').find({}).toArray(function(err, info) {
                if (err) {
                    msg.err = 1;
                } else {
                    msg.result = info;
                }

                endcb(msg);
            });
        });
    });

};

module.exports = {
    'handle': handle
};