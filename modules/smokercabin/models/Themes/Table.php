<?php

/**
 * Storage table
 */
class Smokercabin_Themes_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'smokercabin_themes';

    protected $_nullableFields = array(
        'parent_id',
        'account_id'
    );
}