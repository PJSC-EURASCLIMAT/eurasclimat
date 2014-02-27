Ext.define('EC.CRM.store.Calcpd.Main', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcpd.Main',
    
    autoLoad: true,
    
    remoteSort: true,
    
    sorters: [{property: 'date', direction: 'DESC'}],
    
    pageSize: 25,
    
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
    }

});