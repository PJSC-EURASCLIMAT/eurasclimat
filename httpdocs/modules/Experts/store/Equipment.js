Ext.define('EC.Experts.store.Equipment', {

    extend: 'Ext.data.Store',

    model: 'EC.Experts.model.Ref',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/experts/experts-ref/get-list'
        },
        extraParams: {
            ref_name: 'equipment'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }

});