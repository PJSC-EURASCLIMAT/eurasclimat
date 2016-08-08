Ext.define('EC.Catalog.store.Services', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Services',
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/services/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});