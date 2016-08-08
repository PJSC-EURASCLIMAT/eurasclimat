Ext.define('EC.CRM.store.Projects.Members', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects.Members',
    
    groupField: 'role',
    
    remoteGroup: false,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects/get-members'
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