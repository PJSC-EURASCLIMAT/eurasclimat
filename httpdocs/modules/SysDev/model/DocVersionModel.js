Ext.define('EC.SysDev.model.DocVersionModel', {

    extend: 'Ext.data.Model',

    idProperty: 'id',
   
    fields: [
        'id',
        'doc_id',
        'file_id',
        'file_name',
        'project_id',
        {name: 'date_create', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
});