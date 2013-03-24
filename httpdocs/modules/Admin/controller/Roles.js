Ext.define('EC.Admin.controller.Roles', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Admin.store.Roles'
    ],
    
    models: [
        'EC.Admin.model.Roles'
    ],

    views: [
        'EC.Admin.view.Roles.List'
    ],
    
    run: function(container) {
        
        if (!acl.isView('admin')) {
            return;
        }
        
        container.setLoading('Загрузка...', true);
        
        var treepanel = container.add({
            xtype: 'AdminRolesList',
            preventHeader: true,
            border: false,
            listeners: {
                afterLayout: function() {
                    container.setLoading(false);
                }
            }
        });
        
        treepanel.down('button[action=refresh]').on('click', function() {
            treepanel.getSelectionModel().deselectAll(true);
            treepanel.getStore().load();
        });
        
        if (acl.isUpdate('admin')) {

            treepanel.down('button[action=add]').on('click', this.onAddItem);
            treepanel.down('treeview').on('drop', this.onDropItem);
            treepanel.down('actioncolumn').on('click', this.onActionClick, this);
        
            // For update sync 
            treepanel.Editing.on('edit', function(editor, e, eOpts) {
                e.grid.getStore().sync();
            });
        }

        treepanel.getStore().load();
    },

    onDropItem: function(node, data, overModel, dropPosition, eOpts) {
          
        Ext.each(data.records, function(record) {
            record.set('parent_id', record.get('parentId'));
        }, this);
        data.view.getTreeStore().sync();
    },
    
    onAddItem: function(button, e, options) {

        var tree = button.up('AdminRolesList'),
            view = tree.getView(),
            store = tree.getStore(),
            selModel = tree.getSelectionModel(),
            parentNode = selModel.getLastSelected() || tree.getRootNode(),
            record = Ext.create('EC.Admin.model.Roles', {
                parentId: parentNode.getId(),
                parent_id: parentNode.getId()
            }), column;
        
        parentNode.set('leaf', false);
        parentNode.expand();
        
        Ext.each(view.getGridColumns(), function(o) {
            if (o.dataIndex == 'name') {
                column = o;
                return false;
            }
        });;
        
        tree.Editing.on('canceledit', function() {
            parentNode.removeChild(record);
        }, this, {single: true});
        
        var newNode = parentNode.appendChild(record);
        
        Ext.defer(function() {
            tree.Editing.startEdit(record, column); 
        }, 500);
        
    },
    
    onActionClick: function(view, cell, rowIndex, colIndex, e, record, row, options) {
        
        var t = e.getTarget().className.match(/\icon-(\w+)\b/);
        if (!t) {
            return;
        }
        var action = t[1];
        
        switch (action) {
            case 'edit': 
                this.onEditItem.apply(this, arguments);
                break;
            case 'delete':
                this.onDeleteItem.apply(this, arguments);
                break;
        }
    },
    
    onEditItem: function(view, cell, rowIndex, colIndex, e, record, row, options) {
        
        var column;
        Ext.each(view.getGridColumns(), function(o) {
            if (o.dataIndex == 'name') {
                column = o;
                return false;
            }
        });
        
        // options.scope = treepanel
        options.scope.Editing.startEdit(record, column);
    },
    
    onDeleteItem: function(view, cell, rowIndex, colIndex, e, record, row, options) {

        Ext.MessageBox.confirm('Подтверждение', 'Удалить роль?', function(b) {
            
            if ('yes' === b) {
                
                var store = view.getTreeStore(),
                    node = store.getNodeById(record.getId());
                    
                if (node.hasChildNodes()) {
                    Ext.Msg.alert('Ошибка', 'Не пустая роль не может быть удалена.');
                    return;    
                }
                
                node.remove();
                store.sync();
            }
        });
    }    
});