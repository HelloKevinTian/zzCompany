var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common.js');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    common.db.command({
        findAndModify: 'zz_work',
        query: {
            '_id': Number(args._id)
        },
        new: false, //返回更新后的数据
        upsert: true, //没有该条记录时会insert一条（默认是false）
        update: {
            $set: {
                'title': args.title,
                'content': args.content
            }
        }
    }, function(err, result) { // null { value: null, ok: 1 }
        var msg = {};

        if (err) {
            msg.err = 1;
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

};

module.exports = {
    'handle': handle
};