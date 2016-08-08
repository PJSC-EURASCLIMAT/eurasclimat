Ext.define('EC.Admin.model.Acl', {

    extend: 'Ext.data.Model',
   
    fields: [
        {name: 'id', type: 'int'},
        {name: 'roleId', type: 'int'},
        'name',
        'title',
        {name: 'view', type: 'int'},
        {name: 'add', type: 'int'},
        {name: 'update', type: 'int'},
        {name: 'delete', type: 'int'}
    ]
});