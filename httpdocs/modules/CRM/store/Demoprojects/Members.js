Ext.define('EC.CRM.store.Demoprojects.Members', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Demoprojects.Members',
    
    groupField: 'role',
    
    remoteGroup: false,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/demoprojects/get-members'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        pageParam: undefined,
        startParam: undefined,
        sortParam: undefined,
        limitParam: undefined,
        groupParam: undefined
    }
});