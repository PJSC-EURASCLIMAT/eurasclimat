Ext.define('EC.Contractors.store.Docs', {

    storeId: 'EC.Contractors.store.Docs',
    
    extend: 'Ext.data.Store',
    
    model: 'EC.Contractors.model.Docs',

    groupField: 'type',

    sorters: [{
        property: 'date_create',
        direction: 'DESC'
    }],
  
    proxy: {
        type: 'ajax',
        url: '/json/crm/contractors-docs/get-by-item',
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