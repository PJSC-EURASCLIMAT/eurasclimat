Ext.define('EC.Main.store.Currency', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.Currency',
    
    autoLoad: true,
    
    storeId: 'CurrencyStore',
    
    proxy: {
        type: 'ajax',
        url: '/json/default/currency/index/',
        reader: {
            type: 'json'
        }
    }

});