<?php

class Catalog_Airing_Blocks_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table       = new Catalog_Airing_Blocks_Table();
        $this->_structure   = new Catalog_Airing_Blocks_Structure();
    }
}