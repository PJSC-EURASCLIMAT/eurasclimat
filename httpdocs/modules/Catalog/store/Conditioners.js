Ext.define('EC.Catalog.store.Conditioners', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Conditioners',
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/items/get-list' //,
            //update: '/json/catalog/items/update',
            //create: '/json/catalog/items/add',
            //destroy: '/json/catalog/items/delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});