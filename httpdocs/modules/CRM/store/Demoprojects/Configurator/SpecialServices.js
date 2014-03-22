Ext.define('EC.CRM.store.Demoprojects.Configurator.SpecialServices', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Demoprojects.Configurator.SpecialServices',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/demoprojects-configurator/get-special-services-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});