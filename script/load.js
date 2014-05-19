var fs = require('fs');
var path = require('path');

// fs.readFile(path.join(process.env.TEMP, 'nw_mayday_editor.tmp'), function(err, data) {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	var obj = JSON.parse(data);
// 	var fileDialog = $('#fileDialogOpen');
// 	if (obj.filename) {
// 		fileDialog.val(data);
// 	} else {
// 		fileDialog.val('');
// 	}
// });

$(document).ready(function() {
	var filepath = path.join(process.env.TEMP, 'nw_mayday_editor.tmp');
	open(filepath, function(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		loadFile(data);
	});

	function open(filepath, cb) {
		var exist = fs.existsSync(filepath);
		if (exist) {
			editor.window.setTitle(filepath);
			fs.readFile(filepath, "utf8", function(err, data) {
				if ( !! cb && cb.constructor == Function) {
					cb(err, data)
				}
			});
		}
	}

	function loadFile(filepath) {
		var exist = fs.existsSync(filepath);
		if (exist) {
			editor.window.setTitle(filepath);
			fs.readFile(filepath, "utf8", function(err, data) {
				editor.initValue(data);
				editor.moveCursorTo(0, 0);
			});
			$('#fileDialogSave').attr("file", filepath);
			var modelist = ace.require('ace/ext/modelist');
			var mode = modelist.getModeForPath(filepath).mode;
			console.log(mode);
			editor.session.setMode(mode);
		}
	}
});