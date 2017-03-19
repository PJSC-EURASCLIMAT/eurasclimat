Ext.define('EC.CRM.store.Calcfot.Main', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcfot.Main',
    
    autoLoad: true,
    
    remoteSort: true,
    
//    sorters: [{property: 'date', direction: 'DESC'}],
    
    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/calcfot/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});