<?php

class Crm_Demoprojects_Configurator_EquipmentTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'crm_demoprojects_equipment';

    protected $_nullableFields = array(
        'number',
        'price'
    );
}