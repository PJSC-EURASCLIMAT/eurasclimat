<?php

class Crm_Projects_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'crm_projects';

    protected $_nullableFields = array(
        'creator_id',
        'customer_id',
        'address',
        'description',
        'manager_id',
        'preparation',
        'coordination',
        'execution',
        'implementation'
    );
}