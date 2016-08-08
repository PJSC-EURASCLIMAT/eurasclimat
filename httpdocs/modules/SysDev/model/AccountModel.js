Ext.define('EC.SysDev.model.AccountModel', {

    extend: 'Ext.data.Model',
   
    fields: [
        { name: 'id', type: 'number' },
        'name',
        'email',
        'country',
        'city',
        'active',
        'password_set',
        'roles'
    ]
    
});