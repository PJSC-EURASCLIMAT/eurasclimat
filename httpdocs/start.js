Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Ext'   : './library/ext4/src',
        'xlib'  : './library/xlib',
        'EC'    : './modules/'
    }
});

Ext.onReady(function () {
   new MyDesktop.App();
});

//Ext.require('EC.Layout.controller.Users');

//console.log('test loader');
//
//Ext.application({
//    
//    name: 'Layout',
//
//    appFolder: './modules/Layout',
//
//    controllers: [
//        'Users'
//    ],
//    
//    launch: function() {
//        Ext.create('Ext.container.Viewport', {
//            layout: 'fit',
//            items: [
//                {
//                    xtype: 'panel',
//                    title: 'Users',
//                    html : 'List of users will go here'
//                }
//            ]
//        });
//    }
//});