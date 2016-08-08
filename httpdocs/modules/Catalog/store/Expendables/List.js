Ext.define('EC.Catalog.store.Expendables.List', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Expendables.List',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    pageSize: 20,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/expendables/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});