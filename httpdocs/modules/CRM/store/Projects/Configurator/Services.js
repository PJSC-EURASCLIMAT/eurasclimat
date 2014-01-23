Ext.define('EC.CRM.store.Projects.Configurator.Services', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects.Configurator.Services',
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects-configurator/get-services-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});