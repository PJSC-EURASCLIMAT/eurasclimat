Ext.define('Project.model.AccountModel', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'email',
        'country',
        'city',
        'active',
        'password_set',
        'roles'
    ]
    
});