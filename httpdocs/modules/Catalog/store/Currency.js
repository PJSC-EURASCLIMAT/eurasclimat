Ext.define('EC.Catalog.store.Currency', {
    
    extend: 'Ext.data.Store',
    
    storeId: 'CatalogCurrencyStore',
    
    fields: ['id', 'name', 'sign'], 
    
    data: [{
        id:     '0',
        name:   '- Не выбрано -',
        sign:   ''
    }, {
        id:     '1',
        name:   'Руб.',
        sign:   ''
    }, {
        id:     '2',
        name:   'USD',
        sign:   ''
    }, {
        id:     '3',
        name:   'EUR',
        sign:   ''
    }]

});