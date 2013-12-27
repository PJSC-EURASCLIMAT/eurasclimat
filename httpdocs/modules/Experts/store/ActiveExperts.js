Ext.define('EC.Experts.store.ActiveExperts', {

    extend: 'Ext.data.Store',

    storeId: 'ActiveExpertsStore',

    model: 'EC.Experts.model.Expert',
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/experts/experts/get-active-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    },
});