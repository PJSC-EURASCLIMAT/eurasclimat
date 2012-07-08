Ext.define('EC.Catalog.view.Dustextraction.Layout', {

    extend: 'Ext.panel.Panel',
   
    alias: ['widget.DustextractionLayout'],
    
    layout: 'border',
    
    border: false,
    
    defaults: {
        border: false
    },
    
    items: [{
        xtype: 'DustextractionFiltersPanel',
        region: 'north'
    }, {
        xtype: 'DustextractionList',
        region: 'center'
    }]
});