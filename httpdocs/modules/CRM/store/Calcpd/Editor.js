Ext.define('EC.CRM.store.Calcpd.Editor', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcpd.Editor',
    
    groupField: 'obj_class_name',
    
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/calcpd/get',
            update: '/json/crm/calcpd/update-line',
            destroy: '/json/crm/calcpd/delete-line'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
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