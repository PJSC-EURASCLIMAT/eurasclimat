Ext.define('EC.CRM.store.Projects.Calcpd', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Projects.Calcpd',
    
    groupField: 'obj_class_name',
    
    autoSync: true,
    
    proxy: {
        type: 'ajax',
        api: {
            read:   '/json/crm/projects-calcpd/list',
            update: '/json/crm/projects-calcpd/update',
            destroy: '/json/crm/projects-calcpd/delete'
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