Ext.define('App.view.CenterPanel', {

    extend: 'Ext.tab.Panel',

    requires: [
        'EC.Main.view.Layout',
        'EC.Catalog.view.Layout'
    ],
    
    alias: 'widget.CenterPanel',

    region: 'center',
    
    tabBar: {
        baseCls: 'xlib-bkg'
    }    
});