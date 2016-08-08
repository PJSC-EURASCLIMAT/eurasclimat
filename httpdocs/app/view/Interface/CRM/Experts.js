Ext.define('App.view.Interface.CRM.Experts', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Специалисты',
    
    icon: '/images/icons/sys_dev.png',

    loaded: false,
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Experts-column-1'
        }, {
            id: 'Experts-column-2'
        }, {
            id: 'Experts-column-3'
        }]
    }]

});