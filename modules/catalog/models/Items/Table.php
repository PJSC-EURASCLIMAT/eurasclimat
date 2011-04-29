<?php

class Catalog_Items_Table extends OSDN_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_items';

    protected $_nullableFields = array(
        'mark_id',
        'type_id',
        'measure_id',
        'chapter_id',
        'price',
        'cold',
        'warm',
        'power'
    );
}