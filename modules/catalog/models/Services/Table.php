<?php

class Catalog_Services_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_services';

    protected $_nullableFields = array(
        'code',
        'entity',
        'entity_id'
    );
}