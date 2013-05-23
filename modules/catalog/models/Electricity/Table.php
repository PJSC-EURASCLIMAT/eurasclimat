<?php

class Catalog_Electricity_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_electricity';

    protected $_nullableFields = array(
        'group_id',
        'mark_id',
        'marking',
        'product_type_id',
        'implementation_type_id',
        'control_type_id',
        'connection_type_id',
        'protection_type_id',
        'material_id',
        'power_source_id',
        'isolation_type_id',
        'country',
        'temp',
        'power_supply',
        'power',
        'amperage',
        'sensor_inputs',
        'noise_level_min',
        'eer',
        'weight',
        'dimensions',
        'cable_length',
        'speed',
        'switching_time',
        'warranty',
        'storage',
        'reserve',
        'order',
        'url',
        'price',
        'mount_price',
        'description'
    );
}