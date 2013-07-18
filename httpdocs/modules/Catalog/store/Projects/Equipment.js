Ext.define('EC.Catalog.store.Projects.Equipment', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Projects.Equipment',
    
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