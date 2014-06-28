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
            hidden: this.isPortlet,
            itemId: 'types-list',
            border: '0 1 0 0',
            split: true,
            width: 250
        }, {
            xtype: 'qualifications-list',
            border: '0 0 0 1',
            permissions: this.permissions,
            isPortlet: this.isPortlet,
            layout: 'fit',
            itemId: 'list',
            region: 'center'
        }];
        
        this.callParent();
    }
});