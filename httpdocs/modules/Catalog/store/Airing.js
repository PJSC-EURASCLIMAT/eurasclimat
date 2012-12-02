Ext.define('EC.Catalog.store.Airing', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Airing',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    pageSize: 10,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/airing/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});