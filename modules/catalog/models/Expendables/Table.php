<?php

class Catalog_Expendables_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_expendables';

    protected $_nullableFields = array(
        'code',
        'measure',
        'price'
    );
}