Ext.define('xlib.DocTypes.store.DocTypes', {

    extend: 'Ext.data.Store',
   
    model: 'xlib.DocTypes.model.DocTypes',
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/default/doc-types/get-list'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        pageParam: undefined,
        startParam: undefined,
        sortParam: undefined,
        limitParam: undefined
    }

});