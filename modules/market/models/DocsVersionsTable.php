<?php

class Market_DocsVersionsTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'market_docsversions';

    protected $_nullableFields = array(
        'doc_id',
        'file_id',
        'version'
    );
}