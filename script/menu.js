/*
https://github.com/rogerwang/node-webkit/wiki/Window
https://github.com/rogerwang/node-webkit/wiki/MenuItem
*/
var gui = require('nw.gui');
var fs = require('fs');
var child_process = require('child_process');

var win = gui.Window.get();

// 启动时自动最大化
// win.maximize();

win.on('focus', function() {
	editor.focus();
});

// 创建一个菜单栏
var menubar = new gui.Menu({
	type: 'menubar'
});

// 创建一个菜单项
var filemenu = new gui.MenuItem({
	type: "normal",
	label: "文件 (&F)"
});

// 创建子菜单项
filemenu.submenu = new gui.Menu();
filemenu.submenu.append(new gui.MenuItem({
	label: '新建 (&N)',
	click: function() {
		editor.window.setTitleEmpty();
		//editor.initValue('');
		editor.setValue('');
		$('#fileDialogSave').attr("file", '');
	}
}));
filemenu.submenu.append(new gui.MenuItem({
	label: '打开 (&O)',
	click: function() {
		openFile();
	}
}));
filemenu.submenu.append(new gui.MenuItem({
	type: 'separator'
}));
filemenu.submenu.append(new gui.MenuItem({
	label: '退出 (&Q)',
	click: function() {
		require('nw.gui').Window.get().close();
	}
}));
menubar.append(filemenu);

var setting = new gui.MenuItem({
	type: "normal",
	label: "设置 (&S)"
});
setting.submenu = new gui.Menu();
setting.submenu.append(new gui.MenuItem({
	label: '界面设置 (&k)',
	click: function() {
		editor.commands.exec('showSettingsMenu', editor)
	}
}));
setting.submenu.append(new gui.MenuItem({
	label: '快捷键 (&k)',
	click: function() {
		editor.commands.exec('showKeyboardShortcuts', editor)
	}
}));
setting.submenu.append(new gui.MenuItem({
	type: 'separator'
}));
// setting.submenu.append(new gui.MenuItem({
// 	label: '退出 (&Q)',
// 	click: function() {
// 		require('nw.gui').Window.get().close();
// 	}
// }));
menubar.append(setting);

// menubar.append(new gui.MenuItem({
// 	label: '运行 (&R)',
// 	click: function() {
// 		var cwd = process.cwd();
// 		console.log('- cwd: ' + cwd);
// 		var filepath = $('#fileDialogSave').attr("file");
// 		var childProcess = child_process.execFile(path.join(cwd, 'build/gcc/run.bat'), [filepath], {
// 			cwd: cwd
// 		}, function(err) {
// 			if (err) {
// 				console.log('- err: ' + err);
// 			}
// 		});
// 	}
// }));

// 创建一个菜单项
var helpmenu = new gui.MenuItem({
	type: "normal",
	label: '帮助 (&H)'
});
helpmenu.submenu = new gui.Menu();
helpmenu.submenu.append(new gui.MenuItem({
	label: '检查更新',
	click: function() {
		alert('这是最新版本')
	}
}));

helpmenu.submenu.append(new gui.MenuItem({
	label: '关于 (&A)',
	click: function() {
		alert('Loveice: rainoftime@gmail.com')
	}


}));


menubar.append(helpmenu);

win.menu = menubar;

/*
 * Open file
 *
 * todo:: 添加文件类，专门放置这类方法
 */
function openFile() {
	var chooser = $('#fileDialogOpen');
	chooser.change(function(evt) {
		var filepath = chooser.val();
		var exist = fs.existsSync(filepath);
		if (exist) {
			editor.window.setTitle(filepath);
			fs.readFile(filepath, "utf8", function(err, data) {
				editor.initValue(data);
				editor.moveCursorTo(0, 0);
			});
			
			var modelist = ace.require('ace/ext/modelist');
		    var mode = modelist.getModeForPath(filepath).mode;
		    console.log(mode);
		    editor.session.setMode(mode);

			$('#fileDialogSave').attr("file", filepath);
      try {
	      var tmpdir = path.join(process.env.TEMP, 'nw_mayday_editor.tmp');
      } catch(e) {
	      var tmpdir= path.join('/tmp', 'nw_mayday_editor.tmp');
      }
			//fs.writeFile(path.join(process.env.TEMP, 'nw_mayday_editor.tmp'), filepath, function(err) {
			fs.writeFile(tmpdir, filepath, function(err) {
				if (err) {
					alert(err);
				}
			});
		}
	});
	chooser.trigger('click');

}
