<?php

class Catalog_Watersupply_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_watersupply';

    protected $_nullableFields = array(
        'sku',
        'group_id',
        'mark_id',
        'marking'
    );
}