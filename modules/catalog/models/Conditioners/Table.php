<?php

class Catalog_Conditioners_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_conditioners';

    protected $_nullableFields = array(
        'sku',
        'group_id',
        'name_id',
        'mark_id',
        'marking',
        'product_type_id',
        'implementation_type_id',
        'country',
        'condition',
        'purpose',
        'square',
        'volume',
        'input_cooling',
        'input_heating',
        'output_cooling',
        'output_heating',
        'warranty',
        'storage',
        'reserve',
        'order',
        'measure',
        'price'
    );
}