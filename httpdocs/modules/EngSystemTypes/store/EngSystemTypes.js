Ext.define('EC.EngSystemTypes.store.EngSystemTypes', {

    extend: 'Ext.data.Store',

    model: 'EC.EngSystemTypes.model.EngSystemType',

    pageSize: 25,

    proxy: {
        type: 'ajax',

        api: {
            read: '/json/crm/eng-system-types/read',
            create: '/json/crm/eng-system-types/create',
            update: '/json/crm/eng-system-types/update',
            destroy: '/json/crm/eng-system-types/destroy'
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