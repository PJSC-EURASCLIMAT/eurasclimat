Ext.define('EC.Catalog.store.Projects.List', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Projects.List',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/projects/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});