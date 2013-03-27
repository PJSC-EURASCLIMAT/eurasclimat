Ext.define('EC.Catalog.view.Electricity.Layout', {

    extend: 'Ext.panel.Panel',
   
    alias: ['widget.ElectricityLayout'],
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'ElectricityFiltersPanel',
        region: 'north'
    }, {
        xtype: 'ElectricityList',
        region: 'center'
    }]
});