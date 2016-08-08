<?php

class Crm_Projects_Docs_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'crm_projects_docs';

    protected $_nullableFields = array(
        'account_id',
        'name'
    );
}