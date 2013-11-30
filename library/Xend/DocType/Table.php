<?php

class Xend_DocType_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'doc_types';

    protected $_nullableFields = array(
        'name',
    );
}