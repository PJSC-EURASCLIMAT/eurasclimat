Ext.define('App.view.Layout', {

    extend: 'Ext.container.Viewport',

    layout: 'border',
    
    baseCls: 'xlib-wallpaper',
    
    items: [{
        xtype: 'LeftPanel'
    }, {
        region: 'center',
        layout: 'border',
        baseCls: 'xlib-bkg',
        items: [{
            xtype: 'TopPanel'
        }, {
            xtype: 'CenterPanel',
            margins: '0 5 5 0'
        }]
    }]
});