Ext.define('App.view.TopPanel', {

    extend: 'Ext.toolbar.Toolbar',
    
    alias: 'widget.TopPanel',

    baseCls: 'xlib-bkg',
    
    region: 'north',
    
    padding: 5,
    
    border: false,
    
    items: ['->', {
        xtype: 'button',
        text: 'Выход',
        pressed: true,
        handler: function() {
            window.location.href = '/index/logout';
        }
    }]
    
});