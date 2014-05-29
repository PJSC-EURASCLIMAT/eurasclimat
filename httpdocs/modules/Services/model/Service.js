Ext.define('EC.Services.model.Service', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'text',
        'parent_id',
        'profession_id',
        'eng_sys_type_id',
        'norm_hours',
        'min_rank',
        'profession_name',
        'eng_sys_type_name'
    ]
});