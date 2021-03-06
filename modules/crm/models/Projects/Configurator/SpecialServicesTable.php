<?php

class Crm_Projects_Configurator_SpecialServicesTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'crm_projects_special_services';

    protected $_nullableFields = array(
        'number',
        'term',
        'price'
    );
}