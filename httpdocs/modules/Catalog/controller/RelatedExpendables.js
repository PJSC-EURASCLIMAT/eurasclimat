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
    
    getURL: '/json/catalog/special-services/get-related-expendable',
    
    addURL: '/json/catalog/special-services/add-related-expendable',
    
    deleteURL: '/json/catalog/special-services/delete-related-expendable',
    
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
        
    },
    
    deleteItem: function(grid, record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });
            }
        }, this);
    }
});