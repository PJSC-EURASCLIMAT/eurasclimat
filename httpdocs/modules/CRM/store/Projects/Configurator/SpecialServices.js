Ext.define('EC.CRM.store.Projects.Configurator.SpecialServices', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects.Configurator.SpecialServices',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects-configurator/get-special-services-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});