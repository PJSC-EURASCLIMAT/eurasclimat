<?php

class Catalog_SpecialServices_Table extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'catalog_special_services';

    protected $_nullableFields = array(
        'code',
        'measure',
        'term'
    );
}