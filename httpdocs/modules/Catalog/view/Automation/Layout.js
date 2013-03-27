Ext.define('EC.Catalog.view.Automation.Layout', {

    extend: 'Ext.panel.Panel',
   
    alias: ['widget.AutomationLayout'],
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'AutomationFiltersPanel',
        region: 'north'
    }, {
        xtype: 'AutomationList',
        region: 'center'
    }]
});