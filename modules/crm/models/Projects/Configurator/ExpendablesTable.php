<?php

class Crm_Projects_Configurator_ExpendablesTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'crm_projects_special_services_expendables';

    protected $_nullableFields = array(
        'measure',
        'price'
    );
}