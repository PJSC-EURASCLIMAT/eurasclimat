Ext.define('EC.Catalog.view.SpecialServices.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'border',
    
    border: false,
    
    permissions: false,
    
    initComponent: function() {
        
        this.items =  [{
            xtype: 'SpecialServicesGroups',
            permissions: this.permissions,
            layout: 'fit',
            region: 'west',
            width: 300
        }, {
            xtype: 'SpecialServicesList',
            permissions: this.permissions,
            layout: 'fit',
            region: 'center'
        }];
        
        this.callParent();
    }
});