<?php

class Catalog_Items_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_items';

    protected $_nullableFields = array(
        'mark_id',
        'product_type_id',
        'construction_type_id',
        'territoriality_id',
        'condition_id',
        'purpose_id',
        'availability_id',
        'system_type_id'
    );
}