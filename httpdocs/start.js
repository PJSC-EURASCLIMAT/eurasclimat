Ext.ns('EC');

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Ext'   : './library/ext4/src',
        'xlib'  : './library/xlib',
        'EC'    : './modules'
    }
});

Ext.require('EC.MyDesktop.App');

Ext.onReady(function () {
   new EC.MyDesktop.App();
});