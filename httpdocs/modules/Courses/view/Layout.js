Ext.define('EC.Courses.view.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.courses-layout',
    
    layout: 'border',
    
    border: false,

    isPortlet: false,

    initComponent: function() {
        
        this.items = [{
            xtype: 'courses-tree',
            region: 'west',
            hidden: this.isPortlet,
            itemId: 'tree',
            border: '0 1 0 0',
            split: true,
            width: 250
        }, {
            xtype: 'courses-list',
            border: '0 0 0 1',
            isPortlet: this.isPortlet,
            layout: 'fit',
            itemId: 'list',
            region: 'center'
        }];
        
        this.callParent();
    }
});