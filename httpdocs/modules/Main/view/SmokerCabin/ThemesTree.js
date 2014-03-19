Ext.define('EC.Main.view.SmokerCabin.ThemesTree', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.SmokerCabinThemesTree'],
    
    store: 'EC.Main.store.SmokerCabin.ThemesTree',
    
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