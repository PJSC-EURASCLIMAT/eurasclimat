<?php

class Crm_Services_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'services';

    protected $_nullableFields = array(
        'chapter_id',
        'profession_id',
        'eng_sys_type_id',
        'norm_hours',
        'min_rank'
    );
}