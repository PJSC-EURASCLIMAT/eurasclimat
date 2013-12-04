<?php

class Xend_Locations_CitiesTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'cities';

    protected $_nullableFields = array(
        'name',
        'name_en',
        'region'
    );
}