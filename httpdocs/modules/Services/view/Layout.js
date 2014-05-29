Ext.define('EC.Services.view.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.ServicesLayout',
    
    layout: 'fit',
    
    border: false,
    
    items: [{
        xtype: 'ServicesTreeGrid',
        border: true
    }]
    
});