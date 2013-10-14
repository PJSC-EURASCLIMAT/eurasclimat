<?php

/**
 * Storage table for roles
 */
class Sysdev_ProjectStages_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'main_sysdev_project_stages';

    protected $_nullableFields = array(
        'name',
        'date_plan_begin',
        'date_plan_end',
        'date_fact_begin',
        'date_fact_end',
        'account_id',
        'project_id'
    );
}