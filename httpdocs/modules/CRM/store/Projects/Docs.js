Ext.define('EC.CRM.store.Projects.Docs', {

    storeId: 'EC.CRM.store.Projects.Docs',
    
    extend: 'Ext.data.Store',
    
    model: 'EC.CRM.model.Projects.Docs',

    groupField: 'type',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],
  
    proxy: {
        type: 'ajax',
        url: '/json/crm/projects-docs/get-by-project',
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