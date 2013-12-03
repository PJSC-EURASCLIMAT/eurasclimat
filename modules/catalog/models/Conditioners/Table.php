<?php

class Catalog_Conditioners_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_conditioners';

    protected $_nullableFields = array(
        'code',
        'group_id',
        'mark_id',
        'marking',
        'name',
        'product_type_id',
        'implementation_type_id',
        'heatingcooling_id',
        'power_source_id',
        'country',
        'cooling_capacity',
        'heating_capacity',
        'air_consumption_min',
        'air_consumption_max',
        'noise_level_min',
        'noise_level_max',
        'dimensions',
        'warranty',
        'price',
        'currency_id',
        'description'
    );
}