Ext.define('EC.Catalog.view.Expendables.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'border',
    
    border: false,
    
    permissions: false,
    
    initComponent: function() {
        
        this.items =  [{
            xtype: 'ExpendablesGroups',
            permissions: this.permissions,
            layout: 'fit',
            region: 'west',
            width: 300
        }, {
            xtype: 'ExpendablesList',
            permissions: this.permissions,
            layout: 'fit',
            region: 'center'
        }];
        
        this.callParent();
    }
});