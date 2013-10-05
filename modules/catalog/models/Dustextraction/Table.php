<?php

class Catalog_Dustextraction_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_dustextraction';

    protected $_nullableFields = array(
        'code',
        'group_id',
        'mark_id',
        'marking',
        'filtration_id',
        'motor_id',
        'country',
        'power_consumption',
        'vacuum_power',
        'air_flow',
        'vacuum_pressure',
        'noise_level',
        'amperage',
        'dimensions',
        'max_remote_pneumo_valve',
        'max_riser_height',
        'max_cabling_length',
        'riser_diameter',
        'cabling_diameter',
        'dust_tank',
        'motor_resource',
        'max_users',
        'extra_case_valve',
        'soft_start',
        'clean_pipe',
        'vacuum_power_adj',
        'case_lcd',
        'regulating_valve',
        'downy_valve',
        'auto_clean',
        'warranty',
        'url',
        'price',
        'description'
    );
}