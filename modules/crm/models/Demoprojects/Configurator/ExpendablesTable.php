<?php

class Crm_Demoprojects_Configurator_ExpendablesTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'crm_demoprojects_special_services_expendables';

    protected $_nullableFields = array(
        'measure',
        'price'
    );
}