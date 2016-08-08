Ext.define('EC.CRM.model.Projects.Members', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'role',
        'account_id',
        'account_name',
        'city',
        'country',
        'is_editor'
    ]
});