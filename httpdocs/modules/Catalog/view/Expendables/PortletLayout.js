Ext.define('EC.Catalog.view.Expendables.PortletLayout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'fit',
    
    border: false,
    
    permissions: false,
    
    initComponent: function() {
        
        this.items =  [{
            xtype: 'ExpendablesGroups',
            permissions: this.permissions,
            layout: 'fit'
        }];
        
        this.callParent();
    }
});