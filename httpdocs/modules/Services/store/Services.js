Ext.define('EC.Services.store.Services', {

    extend: 'Ext.data.Store',

    model: 'EC.Services.model.Service',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/services/read'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});