Ext.define('EC.Contractors.store.EngSys', {

    extend: 'Ext.data.Store',

    model: 'EC.Contractors.model.EngSys',

    proxy: {
        type: 'ajax',
        api: {
            read: '/json/crm/contractors-engsys/read',
            create: '/json/crm/contractors-engsys/create',
            update: '/json/crm/contractors-engsys/update',
            destroy: '/json/crm/contractors-engsys/destroy'
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