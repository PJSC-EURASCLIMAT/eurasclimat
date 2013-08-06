Ext.define('EC.Main.model.ProjectdevEditor.Docs', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'author',
        'project_id',
        'url',
        {name: 'date_create', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
});