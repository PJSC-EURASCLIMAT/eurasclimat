Ext.define('App.view.Interface.Manufacturers.Partners', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Партнеры',
    
    icon: '/images/icons/projects.png',
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Manufacturers-Trade-column-1'
        }, {
            id: 'Manufacturers-Trade-column-2'
        }, {
            id: 'Manufacturers-Trade-column-3'
        }]
    }]
});