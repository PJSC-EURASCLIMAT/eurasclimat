Ext.define('EC.Admin.Module', {
    
    extend: 'xlib.desktop.Module',
    
    id: 'admin-win',

    name: 'Админка',
    
    iconCls: 'settings',
    
    showShortcut: false,
    
    showInStartMenu: false,
    
    run: function(win) {
        Ext.application({
            name: 'EC.Admin',
            appFolder: './modules/Admin',
            controllers: ['Main'],
            launch: function() {
                win.add({xtype: 'Layout'});
            }
        });
    }
});