Ext.define('EC.Catalog.store.Configurator.Expendables', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Configurator.Expendables',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/projects/get-expendables'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});