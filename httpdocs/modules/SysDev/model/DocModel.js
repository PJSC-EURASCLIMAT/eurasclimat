Ext.define('EC.SysDev.model.DocModel', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'author',
        'project_id',
        'ext',
        {name: 'date_create', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
});