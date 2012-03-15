Ext.define('EC.MyDesktop.App', {
    extend: 'xlib.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'xlib.desktop.ShortcutModel',

//        'MyDesktop.SystemStatus',
//        'MyDesktop.VideoWindow',
//        'MyDesktop.TabWindow',
//        'MyDesktop.Notepad',
//        'MyDesktop.BogusMenuModule',
//        'MyDesktop.BogusModule',
//        'MyDesktop.Blockalanche',
//        'MyDesktop.Settings'
//        'MyDesktop.AccordionWindow',
        'EC.MyDesktop.GridWindow'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
//            new MyDesktop.VideoWindow(),
//            new MyDesktop.TabWindow(),
//            new MyDesktop.Blockalanche(),
//            new MyDesktop.SystemStatus(),
//            new MyDesktop.Notepad(),
//            new MyDesktop.BogusMenuModule(),
//            new MyDesktop.BogusModule(),
//            new MyDesktop.AccordionWindow(),
            new EC.MyDesktop.GridWindow()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            
            cls: 'ux-desktop-black',

            contextMenuItems: [
//                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'xlib.desktop.ShortcutModel',
                data: [
                    { name: 'Список', iconCls: 'grid-shortcut', module: 'grid-win' }
                ]
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
                    text: 'Выход',
                    iconCls: 'logout',
                    handler: me.onLogout,
                    scope: me
                }]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            startBtnText: 'Пуск',
            quickStart: [
//                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
//                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Выход', 'Вы уверены, что хотите покинуть приложение?', function(b) {
            if (b == 'yes') {
                window.location.href = '/index/logout';
            }
        });
    }
});