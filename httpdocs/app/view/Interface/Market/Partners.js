Ext.define('App.view.Interface.Market.Partners', {

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
            id: 'Market-Partners-column-1'
        }, {
            id: 'Market-Partners-column-2'
        }, {
            id: 'Market-Partners-column-3'
        }]
    }]
});