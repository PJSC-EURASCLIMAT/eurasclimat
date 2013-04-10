Ext.define('EC.Main.view.Projectdev.ThemesTree', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.ProjectdevThemesTree'],
    
    store: 'EC.Main.store.Projectdev.ThemesTree',
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',
    hidden: !acl.isUpdate('projects'),
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