$(document).ready(function() {

	// fix menu when passed
	$('.masthead').visibility({
		once: false,
		onBottomPassed: function() {
			$('.fixed.menu').transition('fade in');
		},
		onBottomPassedReverse: function() {
			$('.fixed.menu').transition('fade out');
		}
	});

	// create sidebar and attach to menu open
	$('.ui.sidebar')
		.sidebar('attach events', '.toc.item');

	getJosnData();

});

function getJosnData() {
    $.ajax({
        type: 'POST',
        url: '/admin/work_get',
        dataType: 'json',
        data: {},
        success: function(ret) {
            if (ret.err) {
                console.error(ret.err);
            } else if (ret.result) {
            	if (ret.result.length > 0) {
	            	for (var i = 0; i < ret.result.length; i++) {
	            		$("#container").append("<div class=\"ui item\">" + ret.result[i].content + "<div class=\"ui divider\"></div></div>");
	            	};
            	} else {
            		$("#null").html("<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />")
            	}
            } else {
            	console.error('您尚未添加招聘信息');
            }
        },
        error: function(err) {
            console.error(err);
        }
    });
}

