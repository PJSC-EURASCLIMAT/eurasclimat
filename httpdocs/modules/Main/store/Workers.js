Ext.define('EC.Main.store.Workers', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.Workers',
    
    proxy: {
        type: 'ajax',
        url: '/json/default/workers/index',
        reader: {
            type: 'json',
            root: 'rows',
            successProperty: 'success'
        }
    }
});