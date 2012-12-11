Ext.define('App.view.LeftPanel', {

    extend: 'Ext.Panel',
    
    alias: 'widget.LeftPanel',

    region: 'west',
    
    layout: 'border', 
    
    width: 150,
    
    baseCls: 'xlib-bkg',
    
    border: false,
    
    items: [{
        region: 'north',
        baseCls: 'xlib-bkg',
        height: 140, 
        items: [{
            xtype: 'image',
            src: '/images/logo.png',
            margin: '20 10'
        }]
    }, {
        region: 'center',
        baseCls: 'xlib-bkg',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        padding: 5,
        defaultType: 'button',
        defaults: {
            margins: 5,
            textAlign: 'left'
        },
        items: [{
            text: 'Каталоги',
            title: 'Каталоги продукции и услуг',
            launchModule: 'EC.Catalog.controller.Main',
            hidden: !acl.isView('catalog')
        }, {
            text: 'Администрирование',
            hidden: !acl.isView('admin'),
            launchModule: 'EC.Admin.controller.Main'
        }]
    }]
});