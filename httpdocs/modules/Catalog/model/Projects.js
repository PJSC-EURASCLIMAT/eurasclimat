Ext.define('EC.Catalog.model.Projects', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'created_date',
        'creator_id',
        'creator_name'
    ]
});