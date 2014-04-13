Ext.define('EC.Courses.model.Course', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'description',
        'group_id',
        'group_name',
        'offer_num',
        'price',
        {name: 'closed', type: 'int'}
    ]
});