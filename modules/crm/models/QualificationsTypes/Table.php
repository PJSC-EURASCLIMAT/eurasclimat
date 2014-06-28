<?php

class Crm_QualificationsTypes_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'qualifications_types';

    protected $_nullableFields = array(
        'id',
        'name'
    );

}