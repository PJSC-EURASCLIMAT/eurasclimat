<?php

class Crm_Demoprojects_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'crm_demoprojects';

    protected $_nullableFields = array(
        'creator_id',
        'customer_id',
        'address',
        'description',
        'manager_id',
        'address',
        'object_type',
        'area',
        'description',
        'preparation',
        'coordination',
        'execution',
        'implementation',
        'sys_cond',
        'sys_vent',
        'sys_heat',
        'sys_water',
        'sys_electricity',
        'sys_automation',
        'sys_canal',
        'sys_fire',
        'sys_security',
        'sys_internet',
        'sys_phone',
        'sys_radio',
        'sys_tv',
        'sys_dispatch',
        'sys_clean',
        'serv_project',
        'serv_logistic',
        'serv_execution',
        'serv_implementation'
    );
}