<?php

class Crm_Demoprojects_Configurator_ServicesTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'crm_demoprojects_equipment_services';

    protected $_nullableFields = array(
        'term',
        'price'
    );
}