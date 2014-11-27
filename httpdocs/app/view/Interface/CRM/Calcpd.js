Ext.define('App.view.Interface.CRM.Calcpd', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Калькулятор ПИР',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Calcpd-column-1'
        }, {
            id: 'Calcpd-column-2'
        }, {
            id: 'Calcpd-column-3'
        }]
    }]

});