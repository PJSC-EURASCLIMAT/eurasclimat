Ext.define('EC.Professions.store.Professions', {

    extend: 'Ext.data.Store',

    model: 'EC.Professions.model.Profession',

    pageSize: 25,

    proxy: {
        type: 'ajax',

        api: {
            read: '/json/crm/professions/read',
            create: '/json/crm/professions/create',
            update: '/json/crm/professions/update',
            destroy: '/json/crm/professions/destroy'
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