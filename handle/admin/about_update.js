var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common.js');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    common.db.command({
        findAndModify: 'zz_about',
        query: {},
        new: true, //返回更新后的数据
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
        } else {
            msg.result = result.value;
        }

        endcb(msg);
    });

};

module.exports = {
    'handle': handle
};