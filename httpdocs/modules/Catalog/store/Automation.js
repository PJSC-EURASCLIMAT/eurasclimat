Ext.define('EC.Catalog.store.Automation', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Automation',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    pageSize: 10,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/automation/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});