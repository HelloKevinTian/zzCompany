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
		url: '/admin/about_get',
		dataType: 'json',
		data: {},
		success: function(ret) {
			if (ret.err) {
				console.error(ret.err);
			} else if (ret.result) {
				$("#container").append(makeHtml(ret.result));
			} else {
				$("#null").html("<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />")
				console.error('您尚未添加新闻信息');
			}
		},
		error: function(err) {
			console.error(err);
		}
	});
}

function makeHtml(item) {
	var str = '';

	str += "<h1 class=\"ui center aligned header\">" + item.title + "</h1>";
	str += "<div class=\"ui divider\"></div>";
	str += item.content;

	return str;
}