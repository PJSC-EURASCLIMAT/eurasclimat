Ext.define('EC.Contractors.store.Contractors', {

    extend: 'Ext.data.Store',

    model: 'EC.Contractors.model.Contractors',

    proxy: {
        type: 'ajax',
        api: {
            read: '/json/crm/contractors/read',
            create: '/json/crm/contractors/create',
            update: '/json/crm/contractors/update',
            destroy: '/json/crm/contractors/destroy'
        },
        reader: {
            type: 'json',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            root: 'data',
            encode: true
        }
    }
});