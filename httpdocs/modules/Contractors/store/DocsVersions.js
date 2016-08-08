Ext.define('EC.Contractors.store.DocsVersions', {
    
    storeId: 'EC.Contractors.store.DocsVersions',

    extend: 'Ext.data.Store',
    
    model: 'EC.Contractors.model.DocsVersions',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],

    proxy: {
        type: 'ajax',
        url: '/json/crm/contractors-docs-versions/get-doc-versions',
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