Ext.define('App.view.Layout', {

    extend: 'Ext.container.Viewport',

    layout: 'border',
    
    items: [{
        xtype: 'LeftPanel'
    }, {
        region: 'center',
        layout: 'border',
        baseCls: 'xlib-bkg',
        items: [{
            xtype: 'TopPanel'
        }, {
            xtype: 'CenterPanel'
        }]
    }]
});