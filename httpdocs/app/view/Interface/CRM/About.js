Ext.define('App.view.Interface.CRM.About', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'О системе',
    
    icon: '/images/icons/sys_dev.png',

    loaded: false,
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'About-column-1'
        }, {
            id: 'About-column-2'
        }, {
            id: 'About-column-3'
        }]
    }]

});