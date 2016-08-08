Ext.define('EC.Admin.model.AccountRoles', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'parent_id',
        'checked'
    ]
});