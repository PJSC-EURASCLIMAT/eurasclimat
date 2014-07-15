Ext.define('EC.CRM.store.Demoprojects.DocsVersions', {
    
    storeId: 'EC.CRM.store.Demoprojects.DocsVersions',

    extend: 'Ext.data.Store',
    
    model: 'EC.CRM.model.Demoprojects.DocsVersions',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],

    proxy: {
        type: 'ajax',
        url: '/json/crm/demoprojects-docs-versions/get-doc-versions',
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