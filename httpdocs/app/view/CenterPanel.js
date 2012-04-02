Ext.define('EC.view.CenterPanel', {

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
        title: 'Вкладка раздела 1',
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
                height: 380
            }]
        }
        ]
    }, {
        id: 'tab2', 
        layout: 'fit',
        title: 'Вкладка раздела 2',
        items: [{
            title: 'Панель 1',
            layout: 'fit'
        }]
    }]
    
});