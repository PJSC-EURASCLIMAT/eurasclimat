Ext.define('EC.Catalog.view.Heating.Layout', {

    extend: 'Ext.panel.Panel',
   
    alias: ['widget.HeatingLayout'],
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'HeatingFiltersPanel',
        region: 'north'
    }, {
        xtype: 'HeatingList',
        region: 'center'
    }]
});