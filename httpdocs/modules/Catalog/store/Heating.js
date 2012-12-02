Ext.define('EC.Catalog.store.Heating', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Heating',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    pageSize: 10,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/heating/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});