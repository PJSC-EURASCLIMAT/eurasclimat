Ext.define('EC.Catalog.view.Conditioners.Layout', {

    extend: 'Ext.panel.Panel',
   
    alias: ['widget.ConditionersLayout'],
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'ConditionersFiltersPanel',
        region: 'north'
    }, {
        xtype: 'ConditionersList',
        region: 'center'
    }]
});