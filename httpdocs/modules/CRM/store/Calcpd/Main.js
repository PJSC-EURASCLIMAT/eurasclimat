Ext.define('EC.CRM.store.Calcpd.Main', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcpd.Main',
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/calcpd/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
//        pageParam: undefined,
//        startParam: undefined,
//        sortParam: undefined,
//        limitParam: undefined
    }

});