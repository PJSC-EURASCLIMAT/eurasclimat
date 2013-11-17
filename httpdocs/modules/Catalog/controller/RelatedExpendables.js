Ext.define('EC.Catalog.controller.RelatedExpendables', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.Catalog.store.SpecialServices.RelatedExpendables'
    ],
    
    models: [
        'EC.Catalog.model.SpecialServices.RelatedExpendables'
    ],
    
    views: [
        'EC.Catalog.view.SpecialServices.RelatedExpendables'
    ],
    
    serviceID: null,
    
    permissions: acl.isUpdate('catalog', 'specialservices'),
    
    getURL: '/json/catalog/related-expendables/get-list',
    
    addURL: '/json/catalog/related-expendables/add',
    
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
            title: 'Добавление добавление материала',
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
                this.saveItem(rows[0].get('id'));
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
    
    saveItem: function(itemId) {
        
        Ext.Ajax.request({
            params: {
                service_id: this.serviceID,
                expendable_id: itemId
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
                        if (!response.responseText || response.responseText.success != true) {
                            failureFn(arguments);
                            return;
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