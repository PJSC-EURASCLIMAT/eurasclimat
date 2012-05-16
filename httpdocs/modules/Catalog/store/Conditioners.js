Ext.define('EC.Catalog.store.Conditioners', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Conditioners',
    
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/items/get-list',
            update: '/json/catalog/items/update'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});