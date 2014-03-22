Ext.define('EC.CRM.store.Demoprojects.Configurator.Expendables', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Demoprojects.Configurator.Expendables',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/demoprojects-configurator/get-expendables-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});