Ext.define('EC.CRM.store.Projects.DocsVersions', {
    
    storeId: 'EC.CRM.store.Projects.DocsVersions',

    extend: 'Ext.data.Store',
    
    model: 'EC.CRM.model.Projects.DocsVersions',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],

    proxy: {
        type: 'ajax',
        url: '/json/crm/projects-docs-versions/get-doc-versions',
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