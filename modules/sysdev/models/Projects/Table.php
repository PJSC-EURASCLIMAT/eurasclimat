<?php

/**
 * Storage table for roles
 */
class Sysdev_Projects_Table extends Xend_Db_Table_Abstract {

    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'main_sysdev_projects';

    protected $_nullableFields = array(
        'parent_id',
        'account_id',
        'description',
        'full_desc',
        'date_plan_begin',
        'date_plan_end',
        'date_fact_end',
        'date_vote_begin',
        'date_vote_end',
        'date_discuss_begin',
        'date_discuss_end',
        'budget',
        'stage'
    );
}