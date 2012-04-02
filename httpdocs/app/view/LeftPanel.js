Ext.define('EC.view.LeftPanel', {

    extend: 'Ext.Panel',
    
    alias: 'widget.LeftPanel',

    region: 'west',
    
    layout: 'border', 
    
    width: 180,
    
    baseCls: 'xlib-bkg',
    
    border: false,
    
    items: [{
        region: 'north',
        baseCls: 'xlib-bkg',
        height: 150,
        items: [{
            xtype: 'image',
            src: '/images/logo.png',
            margin: 30,
            width: 120, 
            height: 109
        }]
    }, {
        region: 'center',
        baseCls: 'xlib-bkg',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        padding: 10,
        defaultType: 'button',
        defaults: {
            margins: 5,
            textAlign: 'left'
        },
        items: [{
            text: 'Виджет'
        }, {
            text: 'Другой виджет'
        }, {
            text: 'И ещё виджет'
        }]
    }]
});