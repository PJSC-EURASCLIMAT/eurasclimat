Ext.define('App.view.Interface.Market', {

    extend: 'App.view.PortalLayoutAbstarct',

    alias: 'widget.MarketPanel',
    
    title: 'Торговая площадка',
    
    icon: '/images/icons/trade_platform.png',
    
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