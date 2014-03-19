<?php

/**
 * Storage table for roles
 */
class Smokercabin_Description_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'smokercabin_description';

    protected $_nullableFields = array(
        'account_id'
    );
}