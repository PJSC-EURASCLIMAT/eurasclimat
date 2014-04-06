Ext.define('EC.Experts.store.Courses', {

    extend: 'Ext.data.Store',

    model: 'EC.Experts.model.Course',

    removeFilter: true,

    pageSize: 25,

    proxy: {
        type: 'ajax',

        api: {
            read: '/json/experts/courses/read',
            create: '/json/experts/courses/create',
            update: '/json/experts/courses/update',
            destroy: '/json/experts/courses/destroy'
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