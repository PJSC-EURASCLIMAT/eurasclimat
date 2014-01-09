Ext.define('EC.Experts.model.Expert', {

    extend: 'Ext.data.Model',
   
    fields: [
        'id',
        'name',
        'desc',
        'account_id',
        'city_id',
        'status_id',
        'equip_id',
        'login',
        'status',
        'equipment',
        'city',
        'country',
        'country_id',
        {name: 'active', type: 'int'}
    ]
});