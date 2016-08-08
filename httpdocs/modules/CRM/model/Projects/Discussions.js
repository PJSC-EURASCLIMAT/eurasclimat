Ext.define('EC.CRM.model.Projects.Discussions', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'content',
         {name: 'author', type: 'string'},
        'project_id',
        {name: 'date_create', type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
});