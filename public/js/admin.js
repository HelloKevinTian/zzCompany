$(document).ready(function() {

    $('.ui.sidebar.menu').on('click', '.item', function() {
        if (!$(this).hasClass('dropdown')) {
            $(this)
                .addClass('active')
                .siblings('.item')
                .removeClass('active');
        }
    });

    getJosnData();

    $('.ui.form').form({
        fields: {
            title: {
                identifier: 'title',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your title'
                }]
            }
        }
    }, {
        onValid: function() {
            alert('valid')
        },
        onSuccess: function() {
            alert('all pass');
        }
    });
    $('.ui.form .submit.button').api({
        url: '/test/json',
        method: 'POST',
        // serializeForm: true, //适用于checkbox多选项的情况
        beforeSend: function(settings) {
            settings.data = {
                title: $('.ui.form').form('get field', 'title').val(),
                content: $('.ui.form').form('get field', 'content').val()
            };
            return settings;
        },
        onSuccess: function(data) {
            errMessage('submit ok');
        },
        onFailure: function(response) {
            errMessage('onFailure');
        },
        onError: function(err) {
            errMessage(err);
        },
    });

});

function createTable(dataArray) {
    var tableStr = "<table class=\"ui sortable blue celled table\">";
    tableStr = tableStr + "<thead><tr><th>Title</th><th>Time</th><th>Content</th><th>Setting</th></tr></thead><tbody>";
    var len = dataArray.length;
    if (len >= 10) {
        len = 10;
    }
    for (var i = 0; i < len; i++) {
        tableStr = tableStr + "<tr><td>" + dataArray[i].title + "</td>" + "<td>" + dataArray[i].time + "</td>" + "<td>" + dataArray[i].content + "</td>";
        tableStr = tableStr + "<td><div class=\"ui small primary labeled icon button\"><i class=\"write square large icon\"></i>Update</div></td></tr>"
    }
    tableStr = tableStr + "</tbody><tfoot class=\"full-width\"><tr><th colspan=\"4\"><div class=\"ui right floated positive labeled icon button\"><i class=\"add square large icon\"></i>Add</div></th></tr></tfoot></table>";


    $("#newsTable").html(tableStr);

    $(".ui.table").tablesort();
}

function getJosnData() {
    $.ajax({
        type: 'POST',
        url: '/test/json',
        dataType: 'json',
        data: {},
        success: function(ret) {
            if (ret.err) {
                errMessage(ret.err);
            } else {
                successMessage('数据加载成功~');
                createTable(ret.result);
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