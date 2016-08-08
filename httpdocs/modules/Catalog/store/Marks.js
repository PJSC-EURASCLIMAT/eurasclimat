Ext.define('EC.Catalog.store.Marks', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.Marks',
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/catalog/marks/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});