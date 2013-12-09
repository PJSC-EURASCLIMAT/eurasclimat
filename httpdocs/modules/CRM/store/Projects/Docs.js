Ext.define('EC.CRM.store.Projects.Docs', {

    extend: 'Ext.data.Store',
    
//    alias: 'store.project-doc-store',
   
    model: 'EC.CRM.model.Projects.Docs',

    groupField: 'type',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],
  
    proxy: {
        type: 'ajax',
        url: '/json/crm/project-docs/get-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});