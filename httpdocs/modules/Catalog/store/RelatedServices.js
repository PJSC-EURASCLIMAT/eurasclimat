Ext.define('EC.Catalog.store.RelatedServices', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.RelatedServices',
    
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});