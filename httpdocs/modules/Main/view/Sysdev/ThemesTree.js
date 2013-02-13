Ext.define('EC.Main.view.Sysdev.ThemesTree', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.SysdevThemesTree'],
    
    store: 'EC.Main.store.Sysdev.ThemesTree',
    
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