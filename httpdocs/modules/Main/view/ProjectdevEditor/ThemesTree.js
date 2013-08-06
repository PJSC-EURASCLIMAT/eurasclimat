Ext.define('EC.Main.view.ProjectdevEditor.ThemesTree', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.ProjectdevEditorThemesTree'],
    
    require: ['Ext.tree.plugin.TreeViewDragDrop', 'Ext.grid.plugin.CellEditing'],
    
    store: 'EC.Main.store.ProjectdevEditor.ThemesTree',
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',
    
    hidden: !acl.isView('projectdev'),
    
    viewConfig: {
        plugins: [{
            ptype: 'treeviewdragdrop', 
            pluginId: 'ProjectdevEditorThemesTreeDragDropPlugin', 
            containerScroll: true
        }]
    },
    
    plugins: [{
        ptype: 'cellediting', 
        pluginId: 'ProjectdevEditorThemesTreeCellEditingPlugin'
    }],

    selModel: {
        selection: 'treemodel',
        mode: 'MULTI'
    },
    
    initComponent: function() {
        
        this.columns = [{
            xtype: 'treecolumn',
            dataIndex: 'name',
            flex: 1,
            renderer: function(value, metadata) {
                metadata.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }]; 
        
        this.callParent(arguments);
    }
});