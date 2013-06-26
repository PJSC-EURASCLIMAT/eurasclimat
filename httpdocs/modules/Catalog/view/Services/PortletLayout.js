Ext.define('EC.Catalog.view.Services.PortletLayout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'fit',
    
    border: false,
    
    permissions: false,
    
    initComponent: function() {
        
        this.items =  [{
            xtype: 'ServicesGroups',
            permissions: this.permissions,
            layout: 'fit'
        }];
        
        this.callParent();
    }
});