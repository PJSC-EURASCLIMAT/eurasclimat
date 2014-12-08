Ext.define('EC.Qualifications.store.Qualifications', {

    extend: 'Ext.data.Store',

    model: 'EC.Qualifications.model.Qualification',

    sorters: [{
        property: 'num',
        direction: 'DESC'
    }],

    proxy: {
        type: 'ajax',
        api: {
            read: '/json/crm/qualifications/read',
            create: '/json/crm/qualifications/create',
            update: '/json/crm/qualifications/update',
            destroy: '/json/crm/qualifications/destroy'
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