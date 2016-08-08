Ext.define('EC.CRM.model.Projects.Docs', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'project_id',
        'type',
        'type_id',
        'date',
        'creator',
        'account_id'
    ]
});