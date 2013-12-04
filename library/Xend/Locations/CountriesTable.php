<?php

class Xend_Locations_CountriesTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'countries';

    protected $_nullableFields = array(
        'ISO2',
        'ISO3',
        'name',
        'name_en',
        'region'
    );
}