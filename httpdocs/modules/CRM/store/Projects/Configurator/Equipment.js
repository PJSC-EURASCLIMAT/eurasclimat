Ext.define('EC.CRM.store.Projects.Configurator.Equipment', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects.Configurator.Equipment',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects-configurator/get-equipment-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        pageParam: undefined,
        startParam: undefined,
        sortParam: undefined,
        limitParam: undefined
    }

});