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
		url: '/admin/news_get',
		dataType: 'json',
		data: {},
		success: function(ret) {
			if (ret.err) {
				console.error(ret.err);
			} else if (ret.result) {
				if (ret.result.length > 0) {
					for (var i = 0; i < ret.result.length; i++) {
						$(".ui.relaxed.divided.items").append(makeHtml(ret.result[i]));
					};
				} else {
					$("#null").html("<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />")
				}
			} else {
				console.error('您尚未添加新闻信息');
			}
		},
		error: function(err) {
			console.error(err);
		}
	});
}

function makeHtml(item) {
	var colorList = ['blue', 'red', 'green', 'gray', 'black'];
	var color = colorList[Math.floor(Math.random() * colorList.length)];
	var str = '';
	str += "<div class=\"item\">";
	str += "<div class=\"ui tiny image\">";
	str += "<img src=\"/images/avatar/news_" + color + ".png\">";
	str += "</div>";
	str += "<div class=\"content\">";
	str += "<a href=\"/views/front_newsDetail?article_id=" + item._id + "\" class=\"header\">";
	str += item.title;
	str += "</a>";
	str += "<div class=\"meta\">";
	str += item.time;
	str += "</div>";
	str += "<div class=\"description\">";
	str += item.content ? delHtmlTag(item.content) : "There is no description about this article.";
	str += "</div>";
	str += "<div class=\"extra\">";
	str += "<a href=\"/views/front_newsDetail?article_id=" + item._id + "\" class=\"ui right floated button\">";
	str += "阅读全文";
	str += "<i class=\"angle double right icon\"></i>";
	str += "</a>";
	str += "<div class=\"ui label\">news</div>";
	// str += "<div class=\"ui label\">notice</div>";
	str += "</div>";
	str += "</div>";
	str += "</div>";

	return str;
}

function delHtmlTag(str) {
	return (str.length > 80) ? str.replace(/<[^>]+>/g, "").substr(0, 80) + ' ...' : str.replace(/<[^>]+>/g, "").substr(0); //去掉所有的html标记 
}