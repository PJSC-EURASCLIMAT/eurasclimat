Ext.define('EC.Admin.view.Roles.List', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.AdminRolesList'],
    
    store: 'EC.Admin.store.Roles',
    
    layout: 'fit',
    
    border: false,
    
    rootVisible: false,
    
    useArrows: true,
    
    initComponent: function() {
        
        this.Editing = Ext.create('Ext.grid.plugin.CellEditing', {
            listeners: {
                edit: function() {
                    this.getStore().sync();
                    console.log('synchronization');
                },
                scope: this
            }
        });
        
        this.plugins = [this.Editing];
        
        this.columns = [{
            xtype: 'treecolumn',
            header: 'Роль',
            dataIndex: 'name',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            xtype:'actioncolumn',
            width: 40,
            items: [{
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: this.onEditItem,
                scope: this
            }, {
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: this.onDeleteItem,
                scope: this
            }]
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            tooltip: 'Добавить',
            handler: this.onAddItem,
            scope: this
        }, '->', {
            xtype: 'button',
            text: 'Обновить',
            iconCls: 'x-tbar-loading',
            handler: function() {
                //this.getRootNode().removeAll()
                this.getStore().load();
            },
            scope: this
        }]
        
        this.callParent(arguments);
    },
    
    onEditItem: function(tree, rowIndex, colIndex) {
        var record = tree.getRecord(tree.getNode(rowIndex)), column;
        Ext.each(tree.getGridColumns(), function(o) {
            if (o.dataIndex == 'name') {
                column = o;
                return false;
            }
        });
        this.Editing.startEdit(record, column);
    },
    
    onDeleteItem: function(tree, rowIndex, colIndex) {
        Ext.MessageBox.confirm('Подтверждение', 'Удалить роль?', function(b) {
            if ('yes' === b) {
                //this.getStore().removeAt(rowIndex);
                var record = tree.getRecord(tree.getNode(rowIndex));
                tree.getTreeStore().remove(record);
                //tree.getTreeStore().sync();
            }
        }, this);
    },
    
    onAddItem: function() {
        var editor = this.RowEditing.getEditor();
        if (editor.isVisible() && !editor.autoCancel) {
            return;
        }
        editor.cancelEdit();
        var r = Ext.create('EC.Admin.model.Roles', {id: '', name: ''});
        this.getStore().insert(0, r);
        this.RowEditing.startEdit(r, this.columns[1]);
        this.RowEditing.on('canceledit', function(grid, eOpts) {
            grid.store.remove(r);
        }, this, {single: true});
    }
});