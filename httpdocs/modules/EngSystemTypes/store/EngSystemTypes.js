Ext.define('EC.EngSystemTypes.store.EngSystemTypes', {

    extend: 'Ext.data.Store',

    model: 'EC.EngSystemTypes.model.EngSystemType',

    pageSize: 25,

    proxy: {
        type: 'ajax',

        api: {
            read: '/json/crm/engSystemTypes/read',
            create: '/json/crm/engSystemTypes/create',
            update: '/json/crm/engSystemTypes/update',
            destroy: '/json/crm/engSystemTypes/destroy'
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

    }

});