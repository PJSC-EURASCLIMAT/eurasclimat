Ext.define('EC.CRM.model.Projects.Projects', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'group_id',
        'group_name',
        'name',
        'created_date',
        'creator_id',
        'creator_name'
    ]
});