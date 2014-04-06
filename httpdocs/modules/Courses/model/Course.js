Ext.define('EC.Courses.model.Course', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'description',
        'type_id',
        'type_name'
    ]
});