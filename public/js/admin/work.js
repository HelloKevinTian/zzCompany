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
        url: '/admin/work_update',
        method: 'POST',
        // serializeForm: true, //适用于checkbox多选项的情况
        beforeSend: function(settings) {
            settings.data = {
                _id: $('.ui.form').form('get field', '_id').val(),
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
                createTable(ret.result);
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
        url: '/admin/work_get',
        dataType: 'json',
        data: {},
        success: function(ret) {
            if (ret.err) {
                errMessage('数据加载失败');
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

function createTable(dataArray) {
    var tableStr = "<table id=\"dataTable\" class=\"ui blue striped celled table\">";
    tableStr += "<thead><tr><th style=\"display:none\">id</th><th>Title</th><th>Time</th><th style=\"display:none\">Content</th><th>Setting</th></tr></thead><tbody>";
    var len = dataArray.length;

    for (var i = 0; i < len; i++) {
        tableStr += "<tr><td style=\"display:none\">" + dataArray[i]._id + "</td>" + "<td>" + dataArray[i].title + "</td>";
        tableStr += "<td>" + dataArray[i].time + "</td>" + "<td style=\"display:none\">" + dataArray[i].content + "</td>";
        tableStr += "<td><div id=\"updateBtn_";
        tableStr += dataArray[i]._id;
        tableStr += "\" class=\"ui small primary labeled icon button\"><i class=\"write square large icon\"></i>Update</div></td></tr>"
    }
    tableStr = tableStr + "</tbody><tfoot class=\"full-width\"><tr><th colspan=\"4\"><div id=\"addBtn\" class=\"ui right floated positive labeled icon button\"><i class=\"add square large icon\"></i>Add</div></th></tr></tfoot></table>";


    $("#newsTable").html(tableStr);

    initTableEvent();
}

function initTableEvent() {
    $('#dataTable').dataTable({
        "createdRow": function(row, data, dataIndex) {
            // console.log(data[0], data[1], data[3]);

            $('#updateBtn_' + data[0]).click(function() {
                $('#_id').val(data[0]);
                $('#title').val(data[1]);
                editor.html(data[3]);
            });
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