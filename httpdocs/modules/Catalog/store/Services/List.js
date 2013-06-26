Ext.define('EC.Catalog.store.Services.List', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Services.List',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    pageSize: 20,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/services/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});