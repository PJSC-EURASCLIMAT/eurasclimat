Ext.define('EC.CRM.store.Configurator.Services', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Configurator.Services',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects/get-services'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});