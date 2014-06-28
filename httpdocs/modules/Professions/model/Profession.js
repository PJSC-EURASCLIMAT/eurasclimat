Ext.define('EC.Professions.model.Profession', {

    extend: 'Ext.data.Model',

    fields: [
        'id',
        'name',
        'kch',
        'etks',
        'okz',
        'base_salary',
        'eng_sys_type_id',
        'eng_sys_type_name',
        'qualification_type_id',
        'qualification_type_name',
        {name: 'norm_hour_cost', convert: function( v, record ) {
            return record.data.base_salary / 22 / 8;
        }}
    ]
});