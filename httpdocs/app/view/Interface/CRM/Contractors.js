Ext.define('App.view.Interface.CRM.Contractors', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Поставщики',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Contractors-column-1'
        }, {
            id: 'Contractors-column-2'
        }, {
            id: 'Contractors-column-3'
        }]
    }]

});