Ext.define('EC.Catalog.store.SpecialServices.Groups', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.SpecialServices.Groups',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/special-services-groups/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});