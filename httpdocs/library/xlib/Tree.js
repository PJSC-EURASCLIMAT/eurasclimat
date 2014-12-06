Ext.define('xlib.Tree', {
	
    extend: 'Ext.tree.Panel',

    requires: [
        'Ext.data.TreeStore',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.grid.plugin.CellEditing'
    ],

    alias: 'widget.new-tree',

    useArrows: true,

    animate: false,
    
    rootVisible: false,

    permissions: false,

    controllerURL: null,

    hideHeaders: true,
    
    sortableColumns: false,

    store: null,

    addText: 'Добавить',

    addToolTip: 'Добавить',

    showEditAction: false,

    editActionConfig: {},

    confirmDrop: true,
    
    tbar: [],

    initComponent: function() {

        if (null === this.store) {
            this.store = new Ext.data.TreeStore({
                fields: this.fields,
                proxy: {
                    type: 'ajax',
                    api: {
                        read: this.controllerURL + 'read',
                        create: this.controllerURL + 'create',
                        update: this.controllerURL + 'update',
                        destroy: this.controllerURL + 'destroy'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        successProperty: 'success',
                        messageProperty: 'message'
                    },
                    writer: {
                        root: 'data',
                        encode: true
                    }
                },
                autoLoad: false,
                sorters: [{
                    property: 'text',
                    direction: 'ASC'
                }]
            });
            this.store.load();
        }

        var columnsList = [];
        var treeColumn = {
            xtype: 'treecolumn',
            text: 'Наименование',
            dataIndex: 'text',
            flex: 1,
            renderer: function(value, metadata) {
                metadata.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        };

        columnsList.push(treeColumn);

//        this.tbar = ['->',{
//            text: 'Открыть все',
//            itemId: 'open-all',
//            scope: this,
//            handler: this.onExpandAllClick
//        },{
//            text: 'Закрыть все',
//            itemId: 'close-all',
//            scope: this,
//            handler: this.onCollapseAllClick
//        }];

        if (this.permissions && !this.isPortlet) {

            this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
                listeners: {
                    canceledit: function(editor, e, eOpts) {
                        e.record.reject();
                        this.store.sync({
                            success: this.syncSuccess,
                            failure: this.syncFailure,
                            scope: this
                        });
                    },
                    edit: function(editor, e, eOpts) {
                        this.store.sync({
                            success: this.syncSuccess,
                            failure: this.syncFailure,
                            scope: this
                        });
                    },
                    scope: this
                }
            });

            this.viewConfig = {
                plugins: [{
                    ptype: 'treeviewdragdrop',
                    pluginId: 'dd-plugin',
                    containerScroll: true
                }]
            };

            this.viewConfig.listeners = {
                beforedrop: this.onBeforeDrop,
                drop: this.onDrop,
                scope: this
            };

            this.plugins = [this.editing];

            this.selModel = {
                selection: 'treemodel',
                mode: 'SINGLE'
            };

            treeColumn.editor = {
                xtype: 'textfield',
                allowBlank: false
            };

            var actions = [];

            var removeActionConfig = {
                text: 'Удалить',
                icon: '/images/icons/fam/delete.gif',
                scope: this,
                handler: this.deleteNode
            };

            if (this.rootVisible) {
                removeActionConfig.getClass = function(value, meta, record) {
                    if ("root" === record.data.id) {
                        return 'x-hide-visibility';
                    }
                }
            }

            if (this.showEditAction) {
            	var action = {
                    icon: '/images/icons/fam/plugin.gif',
                    tooltip: 'Редактировать',
                    handler: function(treeView, rowIndex, u, button, event, record, rowEl) {
                        this.fireEvent('edititem', treeView, record);
                    },
                    scope: this
                };
            	actions.push(Ext.apply(action, this.editActionConfig));
            }

            actions.push(removeActionConfig);

            if (!Ext.isEmpty(this.columns)) {
                columnsList = Ext.Array.merge(columnsList, this.columns);
            }

            columnsList.push({
                xtype:'actioncolumn',
                width: actions.length * 20,
                items: actions
            });
        }

        this.configureTBar();

        this.columns = columnsList;

        this.callParent();

        if ( this.permissions && !this.isPortlet) {
            this.addBtn = this.down('#add');
        }

//        this.openAllBtn = this.down('#open-all');
//        this.closeAllBtn = this.down('#close-all');

    },

    configureTBar: function() {

        this.tbar = ['->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            scope: this,
            handler: function() {
                this.store.load();
            }
        }];

        if (this.permissions && !this.isPortlet) {
            this.tbar.unshift({
                text: this.addText,
                itemId: 'add',
                icon: 'images/icons/fam/add.png',
                tooltip: this.addToolTip,
                scope: this,
                handler: function() {
                    this.create(true);
                }
            });
        }
    },

    syncSuccess: function(batch, options) {
        this.fireEvent('sync-success');
    },

    syncFailure: function(batch, options) {
        this.fireEvent('sync-failure');
        Ext.MessageBox.alert('Сообщение', 'Операция не выполнена!');
    },

    onExpandAllClick: function() {
    	
        var me = this,
            toolbar = me.down('toolbar');

        me.getEl().mask('Expanding tree...');
        toolbar.disable();

        this.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
            me.closeAllBtn.enable();
        });
    },

    onCollapseAllClick: function() {
    	
        var toolbar = this.down('toolbar');
//        toolbar.disable();
        this.getRootNode().collapseChildren(null, function() {
            // TODO Если все закрыты, то не попадает сюда
//            toolbar.enable();
        });
    },

    create: function(isLeaf) {

        var selectedRecords = this.selModel.getSelection(),
            node,
            me = this,
            leaf = isLeaf || false;

        if (Ext.isArray(selectedRecords)) {
            node = selectedRecords[0];
        } else if (Ext.isObject(selectedRecords)) {
            node = selectedRecords;
        }

        if (Ext.isEmpty(node)) {
            node = this.getRootNode();
        }

        this.addBtn.disable();

        var fn = function() {
        	
            node.set('leaf', false);
            me.getView().refresh();
            node.expand(false, function() {
                var newNode = node.appendChild({
                    leaf: leaf,
                    text: ''
                });
                me.editing.startEdit(newNode, 0);
                me.addBtn.enable();
            }, me);
        };

        if (!node) {
            node = this.getRootNode();
        }

        if (node.phantom) {
            this.on('sync-success', fn.bind(this), this, {single: true});
            return;
        }

        fn();

    },

    constraintErrorHandler: function() {
        Ext.MessageBox.alert('Сообщение', 'Невозможно удалить элемент, есть зависимости');
    },

    checkErrors: function() {
        //TODO хз как ошибки по человечески вынуть
        Ext.each(this.store.proxy.reader.jsonData.errors, function(error) {
            if (-41 === error.code) {
                this.constraintErrorHandler();
            }
        }, this);
    },

    deleteNode: function(treeView, rowIndex, u, button, event, record, rowEl) {

        if ('root' === record.data.id) return;

        var tree = treeView.ownerCt,
            beforeNode,
            error,
            selectionModel = tree.selModel,
            parentNode = record.parentNode,
            index = parentNode.indexOf(record);

        if (!selectionModel.isSelected(record)) {
            selectionModel.select(record);
        }

        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {

            if ('yes' === b) {

                // просто удаляет без синхронизации стора
                // в store.removed падает только один record
                record.remove(false);
                this.store.sync({
                    failure: function(batch, options) {
                        this.checkErrors();
                        beforeNode = parentNode.getChildAt(index);
                        parentNode.insertBefore(record, beforeNode)
                    },
                    scope: this
                });
            }
        }, this);
    },

    onBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
    	if (this.confirmDrop) {
	    	dropHandlers.wait = true;
	        Ext.MessageBox.confirm('Подтверждение', 'Вы уверены что хотите перенести позицию?', function(btn){
	            if (btn === 'yes') {
	                dropHandlers.processDrop();
	            } else {
	                dropHandlers.cancelDrop();
	            }
	        });
    	}
    },

    onDrop: function(node, data, overModel, dropPosition, eOpts) {

        if (overModel.isExpanded()) {
            this.store.sync();
            return;
        }
        
        if ('root' === overModel.data.parentId && ('before' === dropPosition || 'after' === dropPosition)) {
            this.store.sync();
            return;
        }
        if (!overModel.isExpanded()) {
            data.records[0].on('move', function(){
                this.store.sync();
            }, this, {single: true});
        }
    }
});