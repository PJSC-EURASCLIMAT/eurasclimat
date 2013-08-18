Ext.define('Project.view.ProjectTree', {

    extend: 'Ext.tree.Panel',
    
    alias: 'widget.project-tree',
    
    require: ['Ext.tree.plugin.TreeViewDragDrop', 'Ext.grid.plugin.CellEditing'],
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',

    viewConfig: {
        plugins: [{
            ptype: 'treeviewdragdrop', 
            pluginId: 'project-tree-drag-and-drop-plugin', 
            containerScroll: true
        }]
    },
    
    plugins: [{
        ptype: 'cellediting', 
        pluginId: 'project-tree-cell-editing-plugin'
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
            type: 'project-tree-store',
            autoload: true
        });
        
        this.callParent(arguments);
    }

});