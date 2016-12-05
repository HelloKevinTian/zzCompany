function addTab(name, url) {
	$('#tt').tabs('add', {
		title: name,
		content: '<iframe frameborder="0" height=100% width=100% name="' + name + '" src="' + url + '"></iframe>',
		closable: true
	});

}

function show(str) {
	$.messager.show({
		title: '温馨提示',
		msg: str,
		timeout: 2000,
		showType: 'show'
	});
}

function slide(str) {
	$.messager.show({
		title: '温馨提示',
		msg: str,
		timeout: 2000,
		showType: 'slide'
	});
}

function fade(str) {
	$.messager.show({
		title: '温馨提示',
		msg: str,
		timeout: 2000,
		showType: 'fade'
	});
}

function progress(str) {
	$.messager.progress({
		title: 'Please waiting',
		msg: str
	});
	setTimeout(function() {
		$.messager.progress('close');
	}, 3000)
}