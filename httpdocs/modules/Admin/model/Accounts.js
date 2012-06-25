Ext.define('EC.Admin.model.Accounts', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'login',
        'name',
        'email',
        'active',
        'password_set',
        'roles'
    ]
});