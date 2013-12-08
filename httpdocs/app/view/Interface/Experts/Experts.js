Ext.define('App.view.Interface.Experts.Experts', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Специалисты',
    
    icon: '/images/icons/sys_dev.png',

    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Manufacturers-Partners-column-1'
        }, {
            id: 'Manufacturers-Partners-column-2'
        }, {
            id: 'Manufacturers-Partners-column-3'
        }]
    }]

});