Ext.define('EC.Manufacturers.view.Trade.SiteView', {

    extend: 'Ext.container.Container',

    alias: 'widget.ManufacturersTradeView',

    layout: 'border',

    items: [
        {
            itemId: 'tradeList',
            xtype: 'ManufacturersTradeViewList',
            region: 'west',
            width: 200
        },
        {
            itemId: 'tradeFrame',
            xtype: 'container',
            html: '<iframe id="eventsIFrame" width="100%" height="100%" ' +
                'src="">' +
                '</iframe>',
            region: 'center'
        }
    ]
    

    
});