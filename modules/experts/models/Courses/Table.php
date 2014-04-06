<?php

/**
 * Storage table for roles
 */
class Experts_Courses_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'experts_courses';

    protected $_nullableFields = array(
        'name',
        'description',
        'type_id',
    );
}