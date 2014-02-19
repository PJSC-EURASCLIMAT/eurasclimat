Ext.define('EC.PA.store.Messages', {

    extend: 'Ext.data.Store',

    storeId: 'curUserMessages',

    model: 'EC.PA.model.Message',

    sorters: [
        {
            property: 'readed',
            direction: 'ASC'
        },
        {
            property: 'date',
            direction: 'DESC'
        }
    ],

    proxy: {
        type: 'ajax',
        url: '/json/pa/messages/get-list',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});