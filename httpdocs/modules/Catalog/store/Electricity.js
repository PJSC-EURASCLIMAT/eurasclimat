Ext.define('EC.Catalog.store.Electricity', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Electricity',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/electricity/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});