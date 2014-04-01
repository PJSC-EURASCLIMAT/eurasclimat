Ext.define('EC.Catalog.store.Dustextraction', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Dustextraction',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/dustextraction/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});