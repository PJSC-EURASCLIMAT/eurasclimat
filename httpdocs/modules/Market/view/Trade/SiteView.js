Ext.define('EC.Market.view.Trade.SiteView', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.TradeView',

    layout: 'border',
    
    frame: true,
    
    title: 'Тендеры',

    items: [
        {
            itemId: 'tradeList',
            xtype: 'TradeViewList',
            region: 'west',
            width: 300
        },
        {
            itemId: 'tradeFrame',
            xtype: 'container',
            html: '<iframe id="eventsIFrame" width="100%" height="100%" ' +
                'src="">' +
                '<p>Для просмотра сайта выберите его в левом списке</p>' +
                '</iframe>',
            region: 'center'
        }
    ]
    

    
});