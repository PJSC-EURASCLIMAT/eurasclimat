Ext.define('EC.CRM.store.Demoprojects.Groups', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Demoprojects.Groups',
    
    autoLoad: true,
    
    groupField: 'group_name',
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/demoprojects-groups/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});