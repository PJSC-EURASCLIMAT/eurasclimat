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
    
    init: function(container) {
        
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
        
        this.control({
            'AdminRolesList button[action=add]': {
                click: this.onAddItem 
            },
            'AdminRolesList button[action=refresh]': {
                click: function() {
                    treepanel.getStore().load();
                }
            },
            'AdminRolesList actioncolumn': {
                click: this.onActionClick 
            }       
        });
        
    },

    onAddItem: function(button, e, options) {
        
        var tree = button.up('AdminRolesList'),
            view = tree.getView(),
            store = tree.getStore(),
            record = Ext.create('EC.Admin.model.Roles', {}),
            column;
            
        Ext.each(view.getGridColumns(), function(o) {
            if (o.dataIndex == 'name') {
                column = o;
                return false;
            }
        });;
        
        console.log(store);
        
        tree.getRootNode().appendChild({});
        //tree.Editing.startEdit(record, column);
        
        return;
        
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
                view.getTreeStore().getNodeById(record.getId()).remove();
            }
        });
    }    
});