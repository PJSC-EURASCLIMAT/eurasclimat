Ext.define('EC.Contractors.store.Contacts', {

    extend: 'Ext.data.Store',

    model: 'EC.Contractors.model.Contacts',

    proxy: {
        type: 'ajax',
        api: {
            read: '/json/crm/contractors-contacts/read',
            create: '/json/crm/contractors-contacts/create',
            update: '/json/crm/contractors-contacts/update',
            destroy: '/json/crm/contractors-contacts/destroy'
        },
        reader: {
            type: 'json',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            root: 'data',
            encode: true
        },
        pageParam: undefined,
        startParam: undefined,
        sortParam: undefined,
        limitParam: undefined
    }
});