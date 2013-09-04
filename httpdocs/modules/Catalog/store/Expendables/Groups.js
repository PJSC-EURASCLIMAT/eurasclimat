Ext.define('EC.Catalog.store.Expendables.Groups', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Expendables.Groups',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/expendables-groups/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});