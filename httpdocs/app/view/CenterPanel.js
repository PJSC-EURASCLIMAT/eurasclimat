Ext.define('App.view.CenterPanel', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.CenterPanel',

    region: 'center',
    
    border: false,
    
    tabBar: {
        baseCls: 'xlib-bkg'
    },
    
    items: [{
        id: 'tab1',
        title: 'Мой портал',
        xtype: 'portalpanel',
        columns: 3,
        defaults: {
            defaults: {
                height: 200
            }
        },
        items: [{
        }, {
            id: 'col-2',
            items: [{
                title: 'Открытый по умолчанию виджет',
                height: 300
            }]
        }, {
            id: 'col-3',
            items: [{
                title: 'Ещё один уже открытый виджет',
                height: 380,
                html: 'Content'
            }]
        }
        ]
    }]
    
});