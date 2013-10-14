<?php

/**
 * Storage table for roles
 */
class Aboutsystem_Themes_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'aboutsystem_themes';

    protected $_nullableFields = array(
        'parent_id',
        'account_id'
    );
}