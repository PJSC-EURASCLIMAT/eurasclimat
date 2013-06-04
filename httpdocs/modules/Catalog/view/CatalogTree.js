Ext.define('EC.Catalog.view.CatalogTree', {

    extend: 'Ext.tree.Panel',
    
    alias: 'widget.CatalogTree',
    
    store: 'EC.Catalog.store.CatalogTree',
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',
    
    initComponent: function() {
        
        this.columns = [{
            xtype: 'treecolumn',
            dataIndex: 'name',
            flex: 1,
            renderer : function(value, metadata) {
                metadata.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }]; 
        
        this.callParent(arguments);
    }
});