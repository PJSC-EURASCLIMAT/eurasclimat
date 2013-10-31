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
    
    permissions: acl.isUpdate('sysdev', 'info'),

    initComponent: function() {
    
        if (this.permissions) {
            
            this.viewConfig = {
                plugins: [{
                    ptype: 'treeviewdragdrop', 
                    pluginId: 'project-tree-drag-and-drop-plugin', 
                    containerScroll: true
                }]
            };
        
            this.plugins = [{
                ptype: 'cellediting', 
                pluginId: 'project-tree-cell-editing-plugin'
            }];
        
            this.selModel = {
                selection: 'treemodel',
                mode: 'MULTI'
            };
        }
        
        var columnsList = [];
        
        var treeColumn = {
            xtype: 'treecolumn',
            dataIndex: 'name',
            flex: 1,
            renderer: function(value, metadata) {
                metadata.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        };
        
        if (this.permissions) {
            
            treeColumn.listeners = {
                itemdblclick: function( column, record, item, index, e, eOpts ) {
                    console.log("itemdblclick");
                }
            };
            
            treeColumn.editor = {
                xtype: 'textfield',
                allowBlank: false
            };
        }
        
        columnsList.push(treeColumn);
        
        if (this.permissions) {
        
            columnsList.push({
                xtype:'actioncolumn',
                hidden: !acl.isUpdate('sysdev', 'info'),
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
            });
        }
        
        this.columns = columnsList;
        
        this.tbar = ['->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }];
        
        this.callParent();
    }
});