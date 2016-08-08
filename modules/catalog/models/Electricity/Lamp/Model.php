<?php

class Catalog_Electricity_Lamp_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table       = new Catalog_Electricity_Lamp_Table();
        $this->_structure   = new Catalog_Electricity_Lamp_Structure();
    }
}