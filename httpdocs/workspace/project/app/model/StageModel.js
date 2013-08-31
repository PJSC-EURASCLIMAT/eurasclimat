Ext.define('Project.model.StageModel', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'index',
        'name',
        'author',
        'project_id',
        {name: 'date_plan_begin', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_plan_end', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_fact_begin', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_fact_end', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_create', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ],

    proxy: {
        
        type: 'ajax',
        
        api: {
            create: '/json/sysdev/project-stages/create',
            read: '/json/sysdev/project-stages/read',
            update: '/json/sysdev/project-stages/update',
            destroy: '/json/sysdev/project-stages/delete'
        },

        reader: {
            type: 'json',
            root: 'data'
        }
    }
    
});