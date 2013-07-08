<?php

class Xend_Db_Table_Factory extends Xend_Db_Table_Abstract
{
    protected $_name;

    public function __construct($name)
    {
        $this->_name = $name;
        parent::__construct();
    }
}