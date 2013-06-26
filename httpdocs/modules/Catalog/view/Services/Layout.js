Ext.define('EC.Catalog.view.Services.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'border',
    
    border: false,
    
    permissions: false,
    
    initComponent: function() {
        
        this.items =  [{
            xtype: 'ServicesGroups',
            permissions: this.permissions,
            layout: 'fit',
            region: 'west',
            width: 300
        }, {
            xtype: 'ServicesList',
            permissions: this.permissions,
            layout: 'fit',
            region: 'center'
        }];
        
        this.callParent();
    }
});