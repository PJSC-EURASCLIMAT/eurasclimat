Ext.define('EC.SysDev.view.abstract.ProjectTree', {

    extend: 'Ext.tree.Panel',

//    store: 'EC.SysDev.store.ProjectTreeStore',
    
    //alias: 'widget.project-tree',
    
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
    
    columns: [
        {
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
        }, {
            xtype:'actioncolumn',
            width: 20,
            items: [{     
                text: 'Переименовать',
                icon: '/images/icons/fam/cog.png',
                handler: function(treeView, rowIndex, u, button, event, record, rowEl) {
                    var tree = treeView.ownerCt;
                    var selectionModel = tree.getSelectionModel();
                    if (!selectionModel.isSelected(record)) {
                        selectionModel.select(record);
                    }
                    tree.fireEvent('project-tree-context-menu-requested', record, event.getXY());
                }
            }]
        }
    ]
    
});