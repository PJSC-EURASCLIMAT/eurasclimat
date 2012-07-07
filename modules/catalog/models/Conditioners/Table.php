<?php

class Catalog_Conditioners_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_conditioners';

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
        'country',
        'cooling_capacity',
        'heating_capacity',
        'cooling_outdor_temp',
        'heating_outdor_temp',
        'power_supply',
        'cooling_power_consumption',
        'heating_power_consumption',
        'amperage',
        'air_consumption_min',
        'air_consumption_max',
        'sensor_inputs',
        'pressure',
        'noise_level_min',
        'noise_level_max',
        'eer',
        'weight',
        'dimensions',
        'cable_length',
        'pipe_diameter_liquid',
        'pipe_diameter_gas',
        'drain_diameter',
        'trunk_length',
        'elevation_difference',
        'square',
        'volume',
        'warranty',
        'storage',
        'reserve',
        'order',
        'url',
        'price',
        'mount_price'
    );
}