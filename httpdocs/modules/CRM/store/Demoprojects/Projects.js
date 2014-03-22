Ext.define('EC.CRM.store.Demoprojects.Projects', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Demoprojects.Projects',
    
    autoLoad: true,
    
    groupField: 'group_name',
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/demoprojects/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        pageParam: undefined,
        startParam: undefined,
        sortParam: undefined,
        limitParam: undefined
    }
});