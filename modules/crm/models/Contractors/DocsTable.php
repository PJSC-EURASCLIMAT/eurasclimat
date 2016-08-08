<?php

class Crm_Contractors_DocsTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'contractors_docs';

    protected $_nullableFields = array(
        'account_id',
        'name'
    );
}