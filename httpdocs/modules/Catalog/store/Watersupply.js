Ext.define('EC.Catalog.store.Watersupply', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Watersupply',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    pageSize: 10,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/watersupply/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});