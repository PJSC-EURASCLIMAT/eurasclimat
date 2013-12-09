Ext.define('EC.CRM.store.Projects.Configurator.Expendables', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects.Configurator.Expendables',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects/get-expendables'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});