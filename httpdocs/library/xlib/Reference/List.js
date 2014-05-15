Ext.define('xlib.Reference.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ReferenceList',
    
    layout: 'fit',
    
    forceFit: true,

    requires: ['xlib.Reference.Edit'],
    
    getListURL: null,

    addURL: null,

    deleteURL: null,

    updateURL: null,

    permissions: null,

    store: null,

    initComponent: function() {

        if ( this.store === null ) {
            this.store = {
                fields: ['id', 'name'],
                proxy: {
                    type: 'ajax',
                    api: {
                        read:   this.getListURL
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        successProperty: 'success'
                    }
                }
            };
        }

        var actions = [];
        
        if (this.permissions) {

            actions.push({
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.editItem(grid.getStore().getAt(rowIndex));
                },
                scope: this
            });

            actions.push({
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.deleteItem(grid.getStore().getAt(rowIndex));
                },
                scope: this

            });
        }
        
        this.columns = [{
            header: 'Наименование',
            dataIndex: 'name',
            flex: 1
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];

        this.tbar = [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            hidden: !this.permissions,
            handler: this.addItem,
            scope: this
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            handler: this.refreshList,
            scope: this
        }]

        this.callParent(arguments);

        this.on('itemSaved',this.refreshList,this);

        this.refreshList();

    },

    refreshList: function() {
        this.getStore().load();
    },

    addItem: function() {

        var view = Ext.create('xlib.Reference.Edit');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.addURL);
            },
            scope: this
        });
    },

    editItem: function(record) {

        var view = Ext.create('xlib.Reference.Edit');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.updateURL);
            },
            scope: this
        });

        var form = view.down('form');
        form.loadRecord(record);
    },

    updateItem: function(view, URL) {

        var form = view.down('form');
        var data = form.getValues();
        var params = {
            name: data['name']
        };

        if (!Ext.isEmpty(data['id'])) {
           params.id = data['id'];
        }

        Ext.Ajax.request({
            params: params,
            url: URL,
            success: function(form, action) {
                view.close();
                this.fireEvent('itemSaved');
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                }
            },
            scope: this
        });
    },

    deleteItem: function(record) {

        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        }

        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteURL,
                    success: function(response, opts) {
                        try {
                            var r = Ext.decode(response.responseText);
                            if (!r.success) {
                                return failureFn(arguments);
                            }
                        } catch(e) {
                            return failureFn(arguments);
                        }
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: failureFn,
                    scope: this
                });
            }
        }, this);
    }
});