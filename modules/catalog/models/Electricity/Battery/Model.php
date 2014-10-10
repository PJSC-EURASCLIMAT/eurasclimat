<?php

class Catalog_Electricity_Battery_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table       = new Catalog_Electricity_Battery_Table();
        $this->_structure   = new Catalog_Electricity_Battery_Structure();
    }
}