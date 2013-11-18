<?php

class Xend_File_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'files';

    protected $_nullableFields = array(
        'path',
        'date',
        'name',
    );
}