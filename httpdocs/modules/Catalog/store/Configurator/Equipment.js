Ext.define('EC.Catalog.store.Configurator.Equipment', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Configurator.Equipment',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/projects/get-equipment'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});