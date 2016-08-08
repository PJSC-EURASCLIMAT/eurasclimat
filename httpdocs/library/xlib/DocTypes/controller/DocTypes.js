Ext.define('xlib.DocTypes.controller.DocTypes', {
    
    extend: 'Ext.app.Controller',
    
    stores: ['xlib.DocTypes.store.DocTypes'],
    
    models: ['xlib.DocTypes.model.DocTypes'],
    
    views: [
        'xlib.DocTypes.view.List',
        'xlib.DocTypes.view.Combo'
    ],
    
    permissions: acl.isUpdate('admin'),
    
    addURL: '/json/default/doc-types/add',
    
    editURL: '/json/default/doc-types/update',
    
    deleteURL: '/json/default/doc-types/delete',
    
    run: function(container) {

        if (!Ext.isDefined(container)) {
            container = Ext.create('Ext.window.Window', {
                title: 'Список групп документов',
                modal: true,
                width: 400,
                height: 400,
                autoShow: true,
                layout: 'fit',
                border: false,
                buttons: [{
                    text: 'Закрыть',
                    scope: this,
                    handler: function(btn, e) {
                        btn.up('window').close();
                    }
                }]
            });
        }

        this.Container = container;

        var servicesPanel = container.add(Ext.create('xlib.DocTypes.view.List', {
            permissions: this.permissions
        }));

        servicesPanel.down('button[action=refresh]').on({
            click: function() {
                this.getStore('xlib.DocTypes.store.DocTypes').load();
            },
            scope: this
        });
        
        if (this.permissions) {
            
            servicesPanel.down('button[action=additem]').on({
                click: this.addItem,
                scope: this
            });
            
            servicesPanel.on({
                edititem: this.editItem,
                deleteitem: this.deleteItem,
                scope: this
            });
            
            this.on({
                'itemSaved': function() {
                    this.getStore('xlib.DocTypes.store.DocTypes').load();
                },
                scope: this
            }, this);
        }
        
    },
    
    addItem: function() {
        
        var view = Ext.create('xlib.DocTypes.view.Edit');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.addURL);
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var view = Ext.create('xlib.DocTypes.view.Edit');
        view.down('button[action=save]').on({
            click: function() {
                this.updateItem(view, this.editURL);
            },
            scope: this
        });
        
        var form = view.down('form');
        form.loadRecord(record);
    },
    
    updateItem: function(view, URL) {
        
        var form = view.down('form');
        
        form.submit({
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
    
    deleteItem: function(grid, record) {
        
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