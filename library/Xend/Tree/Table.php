<?php

class Xend_Tree_Table extends Xend_Db_Table_Abstract
{
    public function __construct($table_name, $nullable_fields = array())
    {
        $this->_name = $table_name;

        if ( count($nullable_fields) != 0 ) {
            $this->_nullableFields = $nullable_fields;
        }

        parent::__construct();
    }

    protected $_nullableFields = array(
        'id',
        'text',
        'sort',
        'parent_id',
    );
}