Ext.define('EC.Catalog.store.Configurator.SpecialServices', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Configurator.SpecialServices',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/projects/get-special-services'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});