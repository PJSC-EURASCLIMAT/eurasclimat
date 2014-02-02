<?php

/**
 * Storage table for roles
 */
class Experts_ExpertsJobTypes_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'experts_job_types';

    protected $_nullableFields = array(
        'name',
        'date_create',
        'date_update',
        'author_id',
    );
}