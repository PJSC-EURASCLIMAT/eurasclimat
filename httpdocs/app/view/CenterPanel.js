Ext.define('App.view.CenterPanel', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.CenterPanel',

    region: 'center',
    
    tabBar: {
        baseCls: 'xlib-bkg'
    },
    
    items: [{
        id: 'main-tab',
        title: 'Личный кабинет',
        xtype: 'tabpanel',
        tabPosition: 'bottom',
        closable: false,
        border: false,
        bodyPadding: 10,
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
    }]
    
});