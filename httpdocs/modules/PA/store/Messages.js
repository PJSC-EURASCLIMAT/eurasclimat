Ext.define('EC.PA.store.Messages', {

    extend: 'Ext.data.Store',

    storeId: 'curUserMessages',

    model: 'EC.PA.model.Message',

    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/pa/messages/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});