Ext.define('EC.CRM.store.Configurator.SpecialServices', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Configurator.SpecialServices',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects/get-special-services'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});