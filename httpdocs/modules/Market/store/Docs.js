Ext.define('EC.Market.store.Docs', {

    storeId: 'EC.Market.store.Docs',
    
    extend: 'Ext.data.Store',
    
    model: 'EC.Market.model.Docs',

    groupField: 'type',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],
  
    proxy: {
        type: 'ajax',
        url: '/json/market/docs/get-by-item',
        reader: {
            type: 'json',
            root: 'data'
        },
        pageParam: undefined,
        startParam: undefined,
        sortParam: undefined,
        limitParam: undefined
    }

});