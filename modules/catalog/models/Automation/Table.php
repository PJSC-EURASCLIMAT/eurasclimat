<?php

class Catalog_Automation_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_automation';

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
        'isolation_type_id',
        'country',
        'temp_adjustment_range',
        'temp_setting_range',
        'power_supply',
        'heating_power_consumption',
        'amperage',
        'sensor_inputs',
        'pressure',
        'noise_level_min',
        'eer',
        'weight',
        'dimensions',
        'cable_length',
        'spray_angle',
        'warranty',
        'url',
        'price',
        'description'
    );
}