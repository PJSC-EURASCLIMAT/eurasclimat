Ext.define('EC.CRM.store.Projects.Groups', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects.Groups',
    
    autoLoad: true,
    
    groupField: 'group_name',
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects-groups/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});