<?php

class Crm_Services_ChaptersTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'services_chapters';

    protected $_nullableFields = array(
        'parent_id',
    );
}