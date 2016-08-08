Ext.define('EC.Catalog.store.SpecialServices.RelatedExpendables', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Catalog.model.SpecialServices.RelatedExpendables',
    
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});