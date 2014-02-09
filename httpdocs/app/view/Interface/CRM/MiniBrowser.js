Ext.define('App.view.Interface.CRM.MiniBrowser', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Минибраузер',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'MiniBrowser-column-1'
        }, {
            id: 'MiniBrowser-column-2'
        }, {
            id: 'MiniBrowser-column-3'
        }]
    }]

});