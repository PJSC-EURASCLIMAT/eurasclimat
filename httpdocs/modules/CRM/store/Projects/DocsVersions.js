Ext.define('EC.CRM.store.Projects.Docs', {

    extend: 'Ext.data.Store',
    
//    alias: 'store.project-docs-versions-store',
   
    model: 'EC.CRM.model.Projects.DocsVersions',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],


    proxy: {
        type: 'ajax',
        url: '/json/crm/project-docs-versions/get-doc-versions',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});