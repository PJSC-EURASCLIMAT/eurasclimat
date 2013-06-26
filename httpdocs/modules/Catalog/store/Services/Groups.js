Ext.define('EC.Catalog.store.Services.Groups', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Services.Groups',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/services-groups/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});