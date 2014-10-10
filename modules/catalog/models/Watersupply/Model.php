<?php

class Catalog_Watersupply_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table = new Catalog_Watersupply_Table();
    }
}