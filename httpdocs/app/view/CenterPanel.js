Ext.define('App.view.CenterPanel', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.CenterPanel',

    region: 'center',
    
    bodyPadding: 10,
    
    tabBar: {
        baseCls: 'xlib-bkg'
    },
    
    defaults: {
        layout: 'fit',
        closable: true
    },
    
    items: [{
        id: 'portal-tab-1',
        title: 'Мой портал',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
        }, {
        }, {
        }]
    }]
    
});