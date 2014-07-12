Ext.define('EC.CRM.store.Calcsmr.Project', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcsmr.Project',
    
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/calcsmr-project/get',
            destroy: '/json/crm/calcsmr-project/delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            root: 'data',
            encode: true
        },
        pageParam: undefined,
        startParam: undefined,
        sortParam: undefined,
        limitParam: undefined
    }

});