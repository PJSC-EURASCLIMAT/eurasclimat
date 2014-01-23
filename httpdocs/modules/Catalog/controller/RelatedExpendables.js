Ext.define('EC.Catalog.controller.RelatedExpendables', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.SpecialServices.RelatedExpendables'
    ],
    
    models: [
        'EC.Catalog.model.SpecialServices.RelatedExpendables'
    ],
    
    views: [
        'EC.Catalog.view.SpecialServices.RelatedExpendables',
        'EC.Catalog.view.SpecialServices.EditRelatedExpendables'
    ],
    
    serviceID: null,
    
    permissions: acl.isUpdate('catalog', 'specialservices'),
    
    getURL: '/json/catalog/related-expendables/get-list',
    
    addURL: '/json/catalog/related-expendables/add',
    
    updateURL: '/json/catalog/related-expendables/update',
    
    deleteURL: '/json/catalog/related-expendables/delete',
    
    run: function(container) {

        if (Ext.isEmpty(this.serviceID)) {
            throw('service ID must not be empty');
            return;
        }
        
        this.Container = container; 
        
        var content = container.add(Ext.create('EC.Catalog.view.SpecialServices.RelatedExpendables', {
            permissions: this.permissions
        }));
        
        var gridPanel = container.down('CatalogSpecialServicesRelatedExpendables');
        
        gridPanel.down('button[action=refresh]').on({
            click: this.reload,
            scope: this
        });
        
        gridPanel.down('button[action=add]').on({
            click: this.addItem,
            scope: this
        });
                
        gridPanel.on({
            deleteitem: this.deleteItem,
            edititem: this.editItem,
            scope: this
        });
                
        this.on({
            'itemSaved': this.reload,
            scope: this
        }, this);

        this.reload();
        
    },
    
    /* Common section */
    
    reload: function() {
        var gridStore = this.getStore('EC.Catalog.store.SpecialServices.RelatedExpendables');
        gridStore.load({url: this.getURL, params: {id: this.serviceID}});
    },
    
    addItem: function() {
        
        var w = Ext.create('Ext.window.Window', {
            title: 'Добавление материала',
            modal: true,
            width: 1000,
            height: 400,
            autoShow: true,
            layout: 'fit',
            border: false,
            buttons: [{
                text: 'Добавить',
                action: 'add'
            }, {
                text: 'Отменить',
                scope: this,
                handler: function() {
                    w.close();
                }
            }]
        });
        
        var expendablesWidget = this.getController('EC.Catalog.controller.Expendables');
        
        expendablesWidget.run(w);
        
        var grid = w.down('ExpendablesList');
        
        w.down('button[action=add]').on({
            click: function() {
                var rows = grid.getSelectionModel().getSelection();
                if (0 == rows.length) {
                    return;
                }
                this.saveItem(rows[0].get('id'), rows[0].get('price'));
                w.close();
            },
            scope: this
        });
        
        grid.on({
            itemdblclick: function(g, record) {
                this.saveItem(record.get('id'));
                w.close();
            },
            scope: this
        });
    },
    
    saveItem: function(itemId, price) {
        
        Ext.Ajax.request({
            params: {
                service_id: this.serviceID,
                expendable_id: itemId,
                number: 1,
                price: price
            },
            url: this.addURL,
            success: function(response, opts) {
                this.fireEvent('itemSaved');
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
            },
            scope: this
        });
    },
    
    editItem: function(grid, record) {
        
        var w = this.getView('EC.Catalog.view.SpecialServices.EditRelatedExpendables').create();
        
        w.down('form').loadRecord(record);
        
        w.down('button[action=save]').on('click', function() {
            
            w.down('form').submit({
                url: this.updateURL,
                success: function(form, action) {
                    this.fireEvent('itemSaved');
                    w.close();
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
        }, this)
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