Ext.define('App.view.Interface.CRM.Calc', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Калькулятор проектной документации',
    
    icon: '/images/icons/sys_dev.png',

    loaded: false,
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Calc-column-1'
        }, {
            id: 'Calc-column-2'
        }, {
            id: 'Calc-column-3'
        }]
    }]

});