Ext.define('App.view.Interface.CRM.Info', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Информация',
    
    icon: '/images/icons/sys_dev.png',

    loaded: false,
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Info-column-1'
        }, {
            id: 'Info-column-2'
        }, {
            id: 'Info-column-3'
        }]
    }]

});