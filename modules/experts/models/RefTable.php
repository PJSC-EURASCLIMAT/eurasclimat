<?php

class Experts_RefTable extends Xend_Db_Table_Abstract
{
    public function __construct($table_name, $fields)
    {
        $this->_name = 'experts_'.$table_name;
        $this->_nullableFields = $fields;
        array_push($this->_nullableFields,'date_create',
            'date_update',
            'author_id');
        parent::__construct();

    }
    /**
     * Table name
     * @var string
     */
    protected $_name = 'experts_rating';

    protected $_nullableFields = array(
        'name',
        'date_create',
        'date_update',
        'author_id',
    );
}