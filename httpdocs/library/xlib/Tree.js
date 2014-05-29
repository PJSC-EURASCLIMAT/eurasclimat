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

    store: null,

    addText: 'Добавить',

    addToolTip: 'Добавить',

    initComponent: function() {

        if ( this.store === null ) {
            this.store =  new Ext.data.TreeStore({
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

        if ( this.permissions ) {

            this.tbar = Ext.Array.merge([{
                text: this.addText,
                itemId: 'add',
                icon: 'images/icons/fam/add.png',
                tooltip: this.addToolTip,
                scope: this,
                handler: function() {
                    this.create(true);
                }
            }], this.tbar);

            this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
                listeners: {
                    canceledit: function( editor, e, eOpts ) {
                        e.record.reject();
                        this.store.sync({
                            success: this.syncSuccess,
                            failure: this.syncFailure,
                            scope: this
                        });
                    },
                    edit: function( editor, e, eOpts ) {
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

//            this.viewConfig.on('beforedrop', this.onBeforeDrop, this);

            this.plugins = [this.editing];

            this.selModel = {
                selection: 'treemodel',
                mode: 'SINGLE'
            };

            treeColumn.editor = {
                xtype: 'textfield',
                allowBlank: false
            };

            var removeIconConfig = {
                text: 'Удалить',
                icon: '/images/icons/delete.png',
                scope: this,
                handler: this.deleteNode
            };

            if ( this.rootVisible ) {
                removeIconConfig.getClass = function( value, meta, record ) {
                    if( record.data.id === "root" ) {
                        return 'x-hide-visibility';
                    }
                }
            }

            if ( !Ext.isEmpty(this.columns) ) {
                columnsList = Ext.Array.merge(columnsList, this.columns);
            }

            columnsList.push({
                xtype:'actioncolumn',
                width: 20,
                items: [removeIconConfig]
            });

        }

        this.columns = columnsList;

        this.callParent();

        this.addBtn = this.down('#add');
        this.openAllBtn = this.down('#open-all');
        this.closeAllBtn = this.down('#close-all');

    },


    syncSuccess: function(batch, options) {
        this.fireEvent('sync-success');
    },

    syncFailure: function(batch, options) {
        this.fireEvent('sync-failure');
        Ext.MessageBox.alert('Сообщение', 'Операция не выполнена!');
    },


    onExpandAllClick: function(){
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

    onCollapseAllClick: function(){
        var toolbar = this.down('toolbar');

//        toolbar.disable();
        this.getRootNode().collapseChildren(null, function() {
            // TODO Если все закрыты, то не попадает сюда
//            toolbar.enable();
        });
    },

    create: function( isLeaf ) {
        var selectedRecords = this.selModel.getSelection(),
            node,
            me = this,
            leaf = isLeaf || false;

        if ( Ext.isArray( selectedRecords ) ) {
            node = selectedRecords[0];
        } else if ( Ext.isObject( selectedRecords ) ) {
            node = selectedRecords;
        }

        if ( Ext.isEmpty(node) ) {
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

        if ( !node ) {
            node = this.getRootNode();
        }

        if ( node.phantom ) {
            this.on('sync-success', fn.bind(this), this, { single: true });
            return;
        }

        fn();

    },

    constraintErrorHandler: function() {
        Ext.MessageBox.alert("Сообщение", "Невозможно удалить элемент, т.к есть зависимости");
    },

    checkErrors: function() {
        //TODO хз как ошибки по человечески вынуть
        Ext.each(this.store.proxy.reader.jsonData.errors, function(error){
            if ( error.code === -41 ) {
                this.constraintErrorHandler();
            }
        }, this);
    },

    deleteNode: function(treeView, rowIndex, u, button, event, record, rowEl) {

        if ( record.data.id === "root" ) return;

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

            if ( 'yes' === b ) {

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

    onBeforeDrop: function( node, data, overModel, dropPosition, dropHandlers, eOpts ) {
//        dropHandlers.processDrop();
    },

    onDrop: function ( node, data, overModel, dropPosition, eOpts ) {

        if ( overModel.isExpanded() ) {
            this.store.sync();
            return;
        }

        if ( overModel.data.parentId === 'root' && (dropPosition === 'before' || dropPosition === 'after')) {
            this.store.sync();
            return;
        }

        if ( !overModel.isExpanded() ) {
            data.records[0].on('move', function(){
                this.store.sync();
            }, this, {single: true});
        }

    }


});