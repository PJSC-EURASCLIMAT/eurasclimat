Ext.define('EC.CRM.store.Demoprojects.Configurator.Equipment', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Demoprojects.Configurator.Equipment',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/demoprojects-configurator/get-equipment-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});