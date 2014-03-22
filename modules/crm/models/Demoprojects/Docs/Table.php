<?php

class Crm_Demoprojects_Docs_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'crm_demoprojects_docs';

    protected $_nullableFields = array(
        'account_id',
        'name'
    );
}