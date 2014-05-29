Ext.define('App.view.Interface.CRM.Services', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Услуги',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'MainPanel-services-column-1'
        }, {
            id: 'MainPanel-services-column-2'
        }, {
            id: 'MainPanel-services-column-3'
        }]
    }]

});