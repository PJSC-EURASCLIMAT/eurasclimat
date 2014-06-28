<?php

class Crm_Qualifications_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'qualifications';

    protected $_nullableFields = array(
        'id',
        'name',
        'type_id',
        'order'
    );

}