Ext.define('EC.Orders.store.Projects', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Orders.model.Projects',
    
    remoteSort: true,
    
    remoteFilter: true,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/orders/projects/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});