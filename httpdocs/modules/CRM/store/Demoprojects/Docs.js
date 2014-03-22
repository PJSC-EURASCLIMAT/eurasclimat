Ext.define('EC.CRM.store.Demoprojects.Docs', {

    storeId: 'EC.CRM.store.Demoprojects.Docs',
    
    extend: 'Ext.data.Store',
    
    model: 'EC.CRM.model.Demoprojects.Docs',

    groupField: 'type',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],
  
    proxy: {
        type: 'ajax',
        url: '/json/crm/demoprojects-docs/get-by-project',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});