Ext.define('EC.CRM.store.Calcsmr.System', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcsmr.System',
    
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/calcsmr-system/get',
            destroy: '/json/crm/calcsmr-system/delete'
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