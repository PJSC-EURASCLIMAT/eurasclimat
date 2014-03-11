Ext.define('EC.CRM.store.Calcpd.Info', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcpd.Info',
    
    groupers: ['obj_type', 'obj_class'],

    remoteGroup: false,
    
    pageSize: 5000,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/calcpd/get-info'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        groupParam: undefined,
        pageParam: undefined,
        startParam: undefined,
        sortParam: undefined,
        limitParam: undefined
    }
});