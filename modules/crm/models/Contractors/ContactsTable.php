<?php

class Crm_Contractors_ContactsTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'contractors_contacts';

    protected $_nullableFields = array(
	    'account_id',
    	'function',
		'work_phone',
		'mobile_phone',
		'email'
    );
}