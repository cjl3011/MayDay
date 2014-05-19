/**
 * @file key.js
 *
 * 快捷键操作
 */
var fs = require('fs');

$(document).ready(function() {
	// 初始化设置焦点
	editor.focus();

	$("#editor").keydown(function(e) {
		// todo::
		console.log(e.which);
	});

	var session = editor.getSession();
	session.on('change', function(e) {
		console.log('e.type: ' + e.type);

		if (session.$undoManager.hasUndo()) {
			// 有可重做则设置标题加 *
			editor.window.setTitleUnsave();
		} else {
			// 有可重做则设置标题去 *
			editor.window.setTitleSave();
		}
	});
});

/*
 * save file
 */
function save(filepath) {
	fs.writeFile(filepath, editor.getValue(), function(err) {
		if (err) {
			alert(err);
			return;
		}
		editor.window.setTitleSave();
	});
}
/*
 * save unknow file (new file)
 */
function saveUnknownFile(chooser) {
	chooser.change(function(evt) {
		var filepath = $(this).val();
		fs.exists(filepath, function(exist) {
			if (exist) {
				if (confirm('Are you sure to overwrite this file?')) {
					save(filepath);
				}
			} else {
				save(filepath);
			}
		});
	});
	chooser.trigger('click');
}

/*
 * save exist file
 */
function saveFile(filepath) {
	var session = editor.getSession();
	if (session.$undoManager.hasUndo()) {
		save(filepath);
	}
}

// todo:: move to config file
editor.commands.addCommand({
	name: 'myCommand',
	bindKey: {
		win: 'Ctrl-S',
		mac: 'Command-S'
	},
	exec: function(editor) {
		var fileDialog = $('#fileDialogSave');
		var value = fileDialog.attr("file");
		fs.exists(value, function(exist) {
			if (exist) {
				saveFile(value);
			} else {
				saveUnknownFile(fileDialog);
			}
		})
	},
	readOnly: true // false if command should not apply in readOnly mode
});

// 显示快捷键
editor.commands.addCommand({
	name: "showKeyboardShortcuts",
	bindKey: {
		win: "Ctrl-Alt-h",
		mac: "Command-Alt-h"
	},
	exec: function(editor) {
		ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
			module.init(editor);
			editor.showKeyboardShortcuts()
		})
	}
})

// 显示菜单
editor.commands.addCommands([{
	name: "showSettingsMenu",
	bindKey: {
		win: "Ctrl-q",
		mac: "Command-q"
	},
	exec: function(editor) {
		editor.showSettingsMenu();
	},
	readOnly: true
}]);

// F11 切换全屏
// //add command to all new editor instaces
// editor.commands.addCommands({
// 	name: "Toggle Fullscreen",
// 	bindKey: "F11",
// 	exec: function(editor) {
// 		var dom = ace.require("ace/lib/dom");
// 		dom.toggleCssClass(document.body, "fullScreen")
// 		dom.toggleCssClass(editor.container, "fullScreen")
//         editor.setAutoScrollEditorIntoView()
// 		editor.resize()
// 	}
// })