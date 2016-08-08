Ext.define('EC.CRM.model.Projects.Projects', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'group_id',
        'group_name',
        'name',
        {name: 'created_date', type: 'date', dateReadFormat: 'Y-m-d H:i:s'},
        'creator_id',
        'creator_name',
        'manager_id',
        'manager_name',
        'stage',
        {name: 'preparation', type: 'date', dateReadFormat: 'Y-m-d H:i:s'},
        {name: 'coordination', type: 'date', dateReadFormat: 'Y-m-d H:i:s'},
        {name: 'execution', type: 'date', dateReadFormat: 'Y-m-d H:i:s'},
        {name: 'implementation', type: 'date', dateReadFormat: 'Y-m-d H:i:s'}
    ]
});