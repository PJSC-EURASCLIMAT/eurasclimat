Ext.define('EC.CRM.store.Projects.Projects', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects.Projects',
    
    groupField: 'group_name',
    
    groupDir: 'ASC',
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects/get-list'
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