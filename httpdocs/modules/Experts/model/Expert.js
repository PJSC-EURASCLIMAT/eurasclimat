Ext.define('EC.Experts.model.Expert', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'desc',
        'account_id',
        'login',
        'status_id',
        'status',
        'equip_id',
        'equipment',
        'city',
        'city_id',
        'country',
        'country_id',
        'have_avatar',
        'rating',
        'work_years',
        'study_years',
        'sert_count',
        {name: 'active', type: 'int'}
    ]
});