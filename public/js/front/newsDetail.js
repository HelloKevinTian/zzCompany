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

	var args = JSON.parse(document.getElementById("args").innerHTML);

	getJosnData(args.article_id);

});

function getJosnData(articleId) {
	$.ajax({
		type: 'POST',
		url: '/admin/news_get',
		dataType: 'json',
		data: {
			_id: articleId
		},
		success: function(ret) {
			if (ret.err) {
				console.error(ret.err);
			} else if (ret.result) {
				$("#container").append(makeHtml(ret.result[0]));
			} else {
				$("#null").html("<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />")
				console.error('未找到该条新闻信息');
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
	str += "<div class=\"ui right aligned tiny header\">" + item.time + "</div>";
	str += "<div class=\"ui divider\"></div>";
	str += item.content;

	return str;
}