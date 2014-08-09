<?php

class Catalog_Electricity_Isolation_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_electricity_isolation';

    protected $_nullableFields = array(
        'code',
        'group_id',
        'mark_id',
        'marking',
        'product_type_id',

        'price',
        'description'
    );
}