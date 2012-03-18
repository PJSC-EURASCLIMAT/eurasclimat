Ext.define('EC.MyDesktop.App', {
    
    extend: 'xlib.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'xlib.desktop.ShortcutModel',
        'EC.MyDesktop.Modules'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.dataClass = Ext.create('EC.MyDesktop.Modules');
        
        this.callParent();

        // now ready...
    },

    getModules: function() {
        return this.dataClass.getModules();
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            
            cls: 'ux-desktop-black',

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'xlib.desktop.ShortcutModel',
                data: this.dataClass.shortcuts
            }),

            wallpaper: '/images/wallpaper.png',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig: function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Администратор',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [{
                    text: 'Админка',
                    iconCls: 'settings',
                    handler: me.onAdmin,
                    scope: me
                }, {
                    text: 'Выход',
                    iconCls: 'logout',
                    handler: me.onLogout,
                    scope: me
                }]
            }
        });
    },

    getTaskbarConfig: function() {
        var ret = this.callParent();
        return Ext.apply(ret, {startBtnText: 'Пуск'});
    },

    onAdmin: function() {
        this.getModule('admin-win').createWindow();
    },
    
    onLogout: function () {
        Ext.Msg.confirm('Выход', 'Вы уверены, что хотите покинуть приложение?', function(b) {
            if (b == 'yes') {
                window.location.href = '/index/logout';
            }
        });
    }
});