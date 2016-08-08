Ext.define('EC.Qualifications.view.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.qualifications-layout',
    
    layout: 'border',
    
    border: false,

    isPortlet: false,

    permissions: false,

    initComponent: function() {
        
        this.items = [{
            xtype: 'qualifications-types-list',
            region: 'west',
            permissions: this.permissions,
            itemId: 'types-list',
            split: !this.isPortlet,
            width: this.isPortlet ? '100%' : 250
        }, {
            xtype: 'qualifications-list',
            permissions: this.permissions,
            hidden: this.isPortlet,
            isPortlet: this.isPortlet,
            layout: 'fit',
            itemId: 'list',
            region: 'center'
        }];
        
        this.callParent();
    }
});