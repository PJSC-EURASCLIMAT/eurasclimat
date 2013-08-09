Ext.define('Project.model.StageChartModel', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        {name: 'name', type: 'string'},
        {name: 'index', type: 'int'},
        {name: 'finish_display', type: 'string'},
        {name: 'date_plan_end', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_fact_end', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_fact_finish', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'date_plan_finish', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
});