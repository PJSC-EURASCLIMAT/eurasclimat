Ext.define('EC.Manufacturers.view.Trade.SiteView', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.ManufacturersTradeView',

    layout: 'border',
    
    frame: true,

    title: 'Производители оборудования',

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
            layout: 'fit',
            items: [
                {
                    xtype: 'container',
                    html: '<iframe id="ManufacturersIFrame" width="100%" height="100%" ' +
                        'src="">' +
                        '</iframe>'
                }
            ],

            region: 'center'
        }
    ]
    

    
});