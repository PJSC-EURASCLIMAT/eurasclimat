<?php

class Catalog_Heating_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table = new Catalog_Heating_Table();
    }
}