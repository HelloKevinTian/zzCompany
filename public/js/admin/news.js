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
        url: '/admin/news_update',
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

function createTable(dataArray) {
    var tableStr = "<table id=\"dataTable\" class=\"ui sortable blue celled table\">";
    tableStr += "<thead><tr><th>Title</th><th>Time</th><th>Content</th><th>Setting</th></tr></thead><tbody>";
    var len = dataArray.length;
    if (len >= 10) {
        len = 10;
    }

    var n = 0;
    for (var i = 0; i < len; i++) {
        n = i + 1;
        tableStr += "<tr><td style=\"display:none\">" + dataArray[i]._id + "</td>" + "<td>" + dataArray[i].title + "</td>" + "<td>" + dataArray[i].time + "</td>" + "<td>" + dataArray[i].content + "</td>";
        tableStr += "<td><div id=\"updateBtn_";
        tableStr += n;
        tableStr += "\" class=\"ui small primary labeled icon button\"><i class=\"write square large icon\"></i>Update</div></td></tr>"
    }
    tableStr = tableStr + "</tbody><tfoot class=\"full-width\"><tr><th colspan=\"4\"><div id=\"addBtn\" class=\"ui right floated positive labeled icon button\"><i class=\"add square large icon\"></i>Add</div></th></tr></tfoot></table>";


    $("#newsTable").html(tableStr);

    $(".ui.table").tablesort();

    onBtnClick(n);
}

function getJosnData() {
    $.ajax({
        type: 'POST',
        url: '/test/json',
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

function updateTable() {
    $("#dataTable").each(function() { //thetable为这个表ID名
        $("#addBtn").live("click", function() { //upnew为这个button控件ID
            var $thisTD = $(this).parents("tr").find("td:eq(3)") //下标0开始的
            $thisTD.find("input").val() //笑脸值
            var $thisTDK = $(this).parents("tr").find("td:eq(4)")
            $thisTDK.find("input").val(); //哭脸值
        });
    });
}

/**
 * kindeditor 
    赋值: editor.html('<p>hello</p>')
    取值: editor.html()
    判空: editor.isEmpty()
 */
function onBtnClick(n) {

    for (var i = 1; i <= n; i++) {
        (function(k) {
            $('#updateBtn_' + k).click(function() {
                var rowData = document.getElementById('dataTable').rows[k].cells;

                $('#_id').val(rowData[0].innerHTML);
                $('#title').val(rowData[1].innerHTML);
                editor.html(rowData[3].innerHTML);
            });
        })(i)
    };

}