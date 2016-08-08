Ext.define('EC.Catalog.view.SettingsList', {

    extend: 'Ext.grid.Panel',
    
    alias: ['widget.SettingsList'],
    
    entity: null,
    
    layout: 'fit',
    
    border: false,
    
    initComponent: function() {
        
        if (Ext.isEmpty(this.entity)) {
            throw 'entity is not defined';
        }
        
        this.store = Ext.create('EC.Catalog.store.Settings', {
            entity: this.entity
        });

        
        this.RowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            autoCancel: false,
            listeners: {
                edit: function() {
                    this.getStore().sync();
                },
                scope: this
            }
        });
        
        this.plugins = [this.RowEditing];
        
        this.columns = [{
            header: '№',
            dataIndex: 'id',
            width: 40
        }, {
            header: 'Название',
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
                handler: function(grid, rowIndex, colIndex) {
                    this.RowEditing.startEdit(this.getStore().getAt(rowIndex), this.columns[1]);
                },
                scope: this
            }, {
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
                        if ('yes' === b) {
                            this.getStore().removeAt(rowIndex);
                            this.getStore().sync();
                        }
                    }, this);
                },
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
                this.getStore().load();
            },
            scope: this
        }]
        
        this.callParent(arguments);
    },
    
    onAddItem: function() {
        var editor = this.RowEditing.getEditor();
        if (editor.isVisible() && !editor.autoCancel) {
            return;
        }
        editor.cancelEdit();
        var r = Ext.create('EC.Catalog.model.Settings', {id: '', name: ''});
        this.getStore().insert(0, r);
        this.RowEditing.startEdit(r, this.columns[1]);
        this.RowEditing.on('canceledit', function(grid, eOpts) {
            grid.store.remove(r);
        }, this, {single: true});
    }
});