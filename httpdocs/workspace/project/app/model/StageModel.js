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
    ]
});