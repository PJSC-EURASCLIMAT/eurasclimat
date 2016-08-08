Ext.define('EC.Catalog.view.SpecialServices.PortletLayout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'fit',
    
    border: false,
    
    permissions: false,
    
    initComponent: function() {
        
        this.items =  [{
            xtype: 'SpecialServicesGroups',
            permissions: this.permissions,
            layout: 'fit'
        }];
        
        this.callParent();
    }
});