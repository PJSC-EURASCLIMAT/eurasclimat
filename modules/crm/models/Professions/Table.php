<?php

class Crm_Professions_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'professions';

    protected $_nullableFields = array(
        'kch',
        'etks',
        'okz',
    );

}