Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Ext'   : '/library/ext4/src',
        'xlib'  : '/library/xlib',
        'EC'    : '/modules'
    }
});

Ext.application({
    name: 'App',
    appFolder: 'app',
    controllers: ['Main'],
    launch: function() {
        var vpMask = new Ext.LoadMask(Ext.getBody(), {msg:'Загрузка...'}); 
        vpMask.show();
        
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [this.getView('Layout').create()],
            listeners: {
                render: function() {
                    vpMask.destroy();
                    vpMask = new Ext.LoadMask(Ext.getBody(), {msg:'Инициализация...'});
                    vpMask.show();
                },
                afterLayout: function() {
                    vpMask.destroy();
                }
            }
        });
    }
});