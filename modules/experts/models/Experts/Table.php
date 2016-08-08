<?php

/**
 * Storage table for roles
 */
class Experts_Experts_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'experts';

    protected $_nullableFields = array(
        'name',
        'desc',
        'city_id',
        'status_id',
        'equip_id',
        'date_create',
        'date_update',
        'author_id',
        'work_years',
        'study_years',
        'sert_count',
    );
}