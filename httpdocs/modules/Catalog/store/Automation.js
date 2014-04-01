Ext.define('EC.Catalog.store.Automation', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Automation',
    
    remoteSort: true,
    
    remoteFilter: true,
    
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