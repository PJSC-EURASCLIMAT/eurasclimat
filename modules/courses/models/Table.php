<?php

/**
 * Storage table for roles
 */
class Courses_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     *
     * @var string
     */
    protected $_name = 'courses';

    protected $_nullableFields = array(
        'name',
        'description',
        'group_id',
        'offer_num',
        'price',
    );
}