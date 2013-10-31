Ext.define('App.view.Interface.CRM.Orders', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Заказы-проекты',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'MainPanel-orders-column-1'
        }, {
            id: 'MainPanel-orders-column-2'
        }, {
            id: 'MainPanel-orders-column-3'
        }]
    }]

});