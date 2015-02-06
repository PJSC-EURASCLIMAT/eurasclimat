<?php

class Crm_Contractors_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'contractors';

    protected $_nullableFields = array(
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
    	'goods',
    	'address',
    	'shipment',
    	'discount',
    	'note',
    	'eng_sys_type_id'
    );
}