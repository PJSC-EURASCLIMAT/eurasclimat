<?php

class Catalog_Heating_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_heating';

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
        'power',
        'productivity',
        'burner_power',
        'amperage',
        'sensor_inputs',
        'pressure',
        'noise_level_min',
        'back_pressure',
        'eer',
        'weight',
        'dimensions',
        'cable_length',
        'burner_tube_length',
        'burner_tube_hole',
        'chimney_diameter',
        'efficiency',
        'warranty',
        'url',
        'price',
        'description'
    );
}