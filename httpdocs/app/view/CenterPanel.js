Ext.define('App.view.CenterPanel', {

    extend: 'Ext.tab.Panel',

    requires: [
        'EC.Main.view.Layout'
    ],
    
    alias: 'widget.CenterPanel',

    id: 'CenterPanel',
    
    region: 'center',
    
    bodyBorder: false,
    
    border: false,
    
    tabBar: {
        baseCls: 'xlib-bkg',
        style: 'margin-left: -3px;'
    }    
});