Ext.define('EC.Qualifications.store.QualificationsTypes', {

    extend: 'Ext.data.Store',

    model: 'EC.Qualifications.model.QualificationType',

    autoLoad: true,

//    pageSize: 25,

    proxy: {
        type: 'ajax',

        api: {
            read: '/json/crm/qualifications-types/read',
            create: '/json/crm/qualifications-types/create',
            update: '/json/crm/qualifications-types/update',
            destroy: '/json/crm/qualifications-types/destroy'
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