Ext.define('EC.CRM.store.Projects', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});