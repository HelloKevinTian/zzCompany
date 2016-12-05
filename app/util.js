var exec = require('child_process').exec;

function formatDate(format, date) {
    var date = date || new Date();
    var format = format || 'yyyy/MM/dd hh:mm:ss';
    var o = {
        "M+": date.getMonth() + 1, //月
        "d+": date.getDate(), //日
        "h+": date.getHours(), //时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

function exeuteCMD(cmd, cb) {
    exec(cmd, function(err, stdout, stderr) {
        cb(err, stdout, stderr);
    });
}

/**
 * "1" "1,2,3" 转换成数组 [1] [1,2,3]
 * toNumber : 是否转成Number
 */
function strToArr(str, toNumber) {
    if (str.indexOf(',') > -1) {
        var strArr = str.split(',');
        if (toNumber) {
            for (var i = 0; i < strArr.length; i++) {
                strArr[i] = Number(strArr[i]);
            };
        }
        return strArr;
    } else {
        var strArr = [];
        if (toNumber) {
            strArr.push(Number(str));
        } else {
            strArr.push(str);
        }
        return strArr;
    }
}

module.exports = {
    'formatDate': formatDate,
    'exeuteCMD': exeuteCMD,
    'strToArr': strToArr
};