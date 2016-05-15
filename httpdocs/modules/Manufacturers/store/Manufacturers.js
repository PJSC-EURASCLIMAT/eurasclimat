Ext.define('EC.Manufacturers.store.Manufacturers', {

    extend: 'Ext.data.Store',

    model: 'EC.Manufacturers.model.Manufacturers',

    autoSync: true,
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read: '/json/crm/manufacturers/read',
            create: '/json/crm/manufacturers/create',
            update: '/json/crm/manufacturers/update',
            destroy: '/json/crm/manufacturers/destroy'
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