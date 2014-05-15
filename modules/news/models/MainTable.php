<?php

class News_MainTable extends Xend_Db_Table_Abstract
{
    /**
     * Table name
     * @var string
     */
    protected $_name = 'news_main';

    protected $_nullableFields = array(
        'account_id',
        'category_id'
    );
}