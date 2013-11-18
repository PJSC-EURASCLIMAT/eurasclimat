Ext.define('EC.SysDev.view.ProjectTree', {

    extend: 'Ext.tree.Panel',

    store: 'EC.SysDev.store.ProjectTreeStore',

    mixins: ['xlib.tree.TreeFilter'],

    alias: 'widget.project-tree',

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

        this.callParent();
    }

//    /**
//     * Filters the tree recursively with the given function.
//     *
//     * @param {Function} fn
//     * @param {Object} [scope]
//     */
//    ,filterBy: function(fn, scope) {
//        scope = scope || this;
//
//        function applyFilter(node) {
//            var out = [];
//            Ext.each(node.childNodes, function(child) {
//                if (fn.call(scope, child)) {
//                    applyFilter(child);
//                } else {
//                    // we can't remove child right away, that would
//                    // kill the loop
//                    out.push(child);
//                }
//            });
//            Ext.each(out, function(child) {
//                // destroy, and suppressEvent
//                node.removeChild(child, true, true);
//            });
//        }
//
//        applyFilter(this.getRootNode());
//    }
//
//    ,filterByStage: function(stage) {
//        this.filterBy(function(record) {
//            return record.get('stage') === String(stage);
//        });
//    }


//    ,initComponent: function() {
//
//        this.store = Ext.getStore({
//            type: 'project-tree-store',
//            autoload: true
//        });
//
//        this.callParent(arguments);
//    }

});