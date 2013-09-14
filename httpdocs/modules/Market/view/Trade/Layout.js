Ext.define('EC.Market.view.Trade.Layout', {

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
            id: 'Market-Trade-column-1'
        }, {
            id: 'Market-Trade-column-2'
        }, {
            id: 'Market-Trade-column-3'
        }]
    }]
});