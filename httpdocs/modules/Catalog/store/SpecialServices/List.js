Ext.define('EC.Catalog.store.SpecialServices.List', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.SpecialServices.List',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    pageSize: 20,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/special-services/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});