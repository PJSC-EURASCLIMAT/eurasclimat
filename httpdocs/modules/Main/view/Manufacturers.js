Ext.define('EC.Main.view.Manufacturers', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.ManufacturersList'],
    
    store: 'EC.Main.store.Manufacturers',
    
    layout: 'fit',
    
    border: false,
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',
    
    initComponent: function() {
        
        this.columns = [{
            xtype: 'treecolumn',
            header: 'Роль',
            dataIndex: 'name',
            flex: 1
        }]; 
        
        this.callParent(arguments);
    }
});