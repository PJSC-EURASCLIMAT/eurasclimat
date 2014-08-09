Ext.define('EC.Market.store.DocsVersions', {
    
    storeId: 'EC.Market.store.DocsVersions',

    extend: 'Ext.data.Store',
    
    model: 'EC.Market.model.DocsVersions',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],

    proxy: {
        type: 'ajax',
        url: '/json/market/docs-versions/get-doc-versions',
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