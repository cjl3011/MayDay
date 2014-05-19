
var win = {};

win.NAME = 'MayDay Editor'
win.TITLE_TAG = ' - ';
win.UNTITLE_TAG = 'Untitled';

win.setTitle = function(msg) {
	document.title = msg + win.TITLE_TAG + win.NAME;
}

win.setTitleUnsave = function() {
	var title = document.title;
	var offset = title.indexOf(win.TITLE_TAG + win.NAME);
	if (title[offset - 1] == '*') {
		return;
	} else if(offset > 0) {
		document.title = title.substr(0, offset) + ' *' + win.TITLE_TAG + win.NAME;
	}
}

win.setTitleSave = function() {
	var title = document.title;
	var offset = title.indexOf(' *' + win.TITLE_TAG + win.NAME);
	if (offset > 0) {
		document.title = title.substr(0, offset) + win.TITLE_TAG + win.NAME;
	}
}

win.setTitleEmpty = function() {
	win.setTitle(win.UNTITLE_TAG);
}

editor.window = win;