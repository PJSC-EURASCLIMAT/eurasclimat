Ext.define('EC.Admin.model.Accounts', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'login',
        'name',
        'email',
        'country',
        'city',
        'active',
        'password_set',
        'roles'
    ]
});