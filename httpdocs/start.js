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
    name: 'EC',
    appFolder: 'app',
    controllers: ['Main'],
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [this.getView('Layout').create()]
        });
    }
});