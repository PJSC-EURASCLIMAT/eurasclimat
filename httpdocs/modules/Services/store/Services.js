Ext.define('EC.Services.store.Services', {

    extend: 'Ext.data.TreeStore',

    model: 'EC.Services.model.Service',

    //pageSize: 25,

    proxy: {
        type: 'ajax',
        api: {
            read: '/json/crm/services/read',
            create: '/json/crm/services/create',
            update: '/json/crm/services/update',
            destroy: '/json/crm/services/destroy'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            messageProperty: 'message'
        },
        writer: {
            root: 'data',
            encode: true
        }
    },

    root: {
        text: "Все услуги",
        expanded: true
    },

    autoLoad: true,

    sorters: [{
    	property: 'leaf',
        direction: 'ASC'
    }, {
        property: 'text',
        direction: 'ASC'
    }]

});