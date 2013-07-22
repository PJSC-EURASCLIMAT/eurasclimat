Ext.define('EC.Catalog.store.Configurator.Services', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Configurator.Services',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/projects/get-services'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});