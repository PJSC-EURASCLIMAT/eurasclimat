Ext.define('EC.Courses.store.Courses', {

    extend: 'Ext.data.Store',

    model: 'EC.Courses.model.Course',

    remoteFilter: true,

    pageSize: 25,

    proxy: {
        type: 'ajax',

        api: {
            read: '/json/courses/courses/read',
            create: '/json/courses/courses/create',
            update: '/json/courses/courses/update',
            destroy: '/json/courses/courses/destroy'
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