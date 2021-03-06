<?php

class Catalog_Watersupply_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_watersupply';

    protected $_nullableFields = array(
        'code',
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
        'country',
        'temp',
        'power_supply',
        'heating_power_consumption',
        'amperage',
        'sensor_inputs',
        'pressure',
        'noise_level_min',
        'filters_performance',
        'performance',
        'pollution_size',
        'eer',
        'weight',
        'dimensions',
        'cable_length',
        'pipe_diameter',
        'delivery_height',
        'immersion_depth',
        'warranty',
        'url',
        'price',
        'description'
    );
}