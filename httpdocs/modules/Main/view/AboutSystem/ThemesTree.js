Ext.define('EC.Main.view.AboutSystem.ThemesTree', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.AboutSystemThemesTree'],
    
    store: 'EC.Main.store.AboutSystem.ThemesTree',
    
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