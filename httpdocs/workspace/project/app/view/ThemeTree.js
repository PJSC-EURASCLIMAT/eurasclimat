Ext.define('Project.view.ThemeTree', {

    extend: 'Ext.tree.Panel',
    
    alias: 'widget.project-theme-tree',
    
    require: ['Ext.tree.plugin.TreeViewDragDrop', 'Ext.grid.plugin.CellEditing'],
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',

    viewConfig: {
        plugins: [{
            ptype: 'treeviewdragdrop', 
            pluginId: 'project-theme-tree-drag-and-drop-plugin', 
            containerScroll: true
        }]
    },
    
    plugins: [{
        ptype: 'cellediting', 
        pluginId: 'project-theme-tree-cell-editing-plugin'
    }],

    selModel: {
        selection: 'treemodel',
        mode: 'MULTI'
    },
    
    columns: [{
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
    }],

    initComponent: function() {
        
        this.store = Ext.getStore({
            type: 'project-theme-tree-store',
            autoload: true
        });
        
        this.callParent(arguments);
    }

});