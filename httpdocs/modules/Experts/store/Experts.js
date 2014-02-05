Ext.define('EC.Experts.store.Experts', {

    extend: 'Ext.data.Store',

    model: 'EC.Experts.model.Expert',

    removeFilter: true,

    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/experts/experts/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});