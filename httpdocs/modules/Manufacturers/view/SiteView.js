Ext.define('EC.Manufacturers.view.SiteView', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.ManufacturersSiteView',

    layout: 'border',
    
    frame: true,

    title: 'Производители оборудования',

    items: [{
        itemId: 'tradeList',
        xtype: 'ManufacturersList',
        region: 'west',
        width: 300
    }, {
        itemId: 'SiteViewFrame',
        xtype: 'container',
        layout: 'fit',
        items: [{
            xtype: 'container',
            html: '<iframe id="ManufacturersIFrame" width="100%" height="100%" src=""></iframe>'
        }],
        region: 'center'
    }]
});