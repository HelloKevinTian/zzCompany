$(document).ready(function() {

    getJosnData();

    // $('.ui.form').form({
    //     fields: {
    //         title: {
    //             identifier: 'title',
    //             rules: [{
    //                 type: 'empty',
    //                 prompt: 'Please enter your title'
    //             }]
    //         }
    //     }
    // }, {
    //     onValid: function() {
    //         alert('valid')
    //     },
    //     onSuccess: function() {
    //         alert('all pass');
    //     }
    // });

    $('.ui.form .submit.button').api({
        url: '/admin/about_update',
        method: 'POST',
        // serializeForm: true, //适用于checkbox多选项的情况
        beforeSend: function(settings) {
            settings.data = {
                title: $('.ui.form').form('get field', 'title').val(),
                content: editor.html()
            };
            return settings;
        },
        onSuccess: function(ret) {
            if (ret.err) {
                errMessage('数据更新失败');
            } else {
                successMessage('数据更新成功~');
            }
        },
        onFailure: function(response) {
            errMessage('onFailure');
        },
        onError: function(err) {
            errMessage(err);
        },
    });

});

function getJosnData() {
    $.ajax({
        type: 'POST',
        url: '/admin/about_get',
        dataType: 'json',
        data: {},
        success: function(ret) {
            if (ret.err) {
                errMessage('数据加载失败');
            } else if (ret.result) {
                successMessage('数据加载成功~');
                $('#title').val(ret.result.title);
                editor.html(ret.result.content);
            } else {
                errMessage('您尚未添加关于信息');
            }
        },
        error: function(err) {
            errMessage(err);
        }
    });
}

function errMessage(msg) {
    var msgStr = "<div class=\"ui negative message\"><i class=\"close icon\"></i><div class=\"header\">温馨提示</div><p>";
    msgStr += msg;
    msgStr += "</p></div>";
    $("#messageTip").html(msgStr);

    onMessageClose();
}

function successMessage(msg) {
    var msgStr = "<div class=\"ui success message\"><i class=\"close icon\"></i><div class=\"header\">温馨提示</div><p>";
    msgStr += msg;
    msgStr += "</p></div>";
    $("#messageTip").html(msgStr);

    onMessageClose();
}

function onMessageClose() {
    $('.message .close').on('click', function() {
        $(this)
            .closest('.message')
            .transition('fade');
    });
}