Ext.define('App.view.Interface.CRM.Calcsmr', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Калькулятор СМР',
    
    icon: '/images/icons/sys_dev.png',
    
    loaded: false,
        
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Calcsmr-column-1'
        }, {
            id: 'Calcsmr-column-2'
        }, {
            id: 'Calcsmr-column-3'
        }]
    }]

});