Ext.define('EC.CRM.store.Calcsmr.Main', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcsmr.Main',
    
    autoLoad: true,
    
    remoteSort: true,
    
    sorters: [{property: 'date', direction: 'DESC'}],
    
    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/calcsmr/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});