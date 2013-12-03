<?php

class Experts_Statuses_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'experts_statuses';

    protected $_nullableFields = array(
        'name',
        'desc',
        'date_create',
        'date_update',
        'author_id',
    );
}