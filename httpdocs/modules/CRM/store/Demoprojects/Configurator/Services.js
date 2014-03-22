Ext.define('EC.CRM.store.Demoprojects.Configurator.Services', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Demoprojects.Configurator.Services',
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/demoprojects-configurator/get-services-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});