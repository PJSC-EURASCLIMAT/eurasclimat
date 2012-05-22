Ext.define('EC.Catalog.view.Conditioners.Layout', {

    extend: 'Ext.panel.Panel',
   
    alias: ['widget.ConditionersLayout'],
    
    layout: 'border',
    
    border: false,
    
    cls: 'x-portlet',
    
    defaults: {
        frame: true,
        border: true
    },
    
    items: [{
        xtype: 'ConditionersFiltersPanel',
        region: 'north',
        margins: '5 5 5 5'
    }, {
        xtype: 'ConditionersList',
        region: 'center',
        margins: '5 5 0 5'
    }]
    
});