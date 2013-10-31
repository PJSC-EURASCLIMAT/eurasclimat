Ext.define('EC.CRM.store.Configurator.Expendables', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Configurator.Expendables',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/CRM/projects/get-expendables'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});