<?php

class Market_DocsTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'market_docs';

    protected $_nullableFields = array(
        'account_id',
        'name'
    );
}