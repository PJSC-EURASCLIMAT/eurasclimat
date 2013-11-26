Ext.define('App.view.Interface.CRM.Development', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Разработка проектов',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'MainPanel-development-column-1'
        }, {
            id: 'MainPanel-development-column-2'
        }, {
            id: 'MainPanel-development-column-3'
        }]
    }]

});