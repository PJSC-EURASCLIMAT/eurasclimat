Ext.define('EC.Contractors.model.Contractors', {

    extend: 'Ext.data.Model',

    fields: [
        'id',
        'name',
        'full_name',
		'legal_address',
		'postal_address',
		'form_organization',
		'ogrn',
		'okved',
		'okato',
		'okpo',
		'inn_kpp',
		'bank_account',
		'bank',
		'bik',
		'corr_account',
		'general_director',
		'chief_accountant',
		'phone',
    	'site',
    	'trademark',
    	'eng_sys_type_id',
    	'goods',
    	'address',
    	'shipment',
    	'discount',
    	'note'
    ]
});