Ext.define('EC.Catalog.view.Watersupply.Layout', {

    extend: 'Ext.panel.Panel',
   
    alias: ['widget.WatersupplyLayout'],
    
    layout: 'border',
    
    border: false,
    
    defaults: {
        border: false
    },
    
    items: [{
        xtype: 'WatersupplyFiltersPanel',
        region: 'north'
    }, {
        xtype: 'WatersupplyList',
        region: 'center'
    }]
});