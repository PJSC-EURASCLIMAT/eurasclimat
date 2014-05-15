Ext.define('EC.Main.store.News.Categories', {

    extend: 'Ext.data.Store',

    fields: ['id', 'name'],

    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read: '/json/default/news/get-categories'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }

    }

});