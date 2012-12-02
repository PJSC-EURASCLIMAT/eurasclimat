Ext.define('EC.Catalog.store.Conditioners', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Conditioners',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    pageSize: 10,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/conditioners/get-list'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});