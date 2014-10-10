<?php

class Catalog_Conditioning_Blocks_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table           = new Catalog_Conditioning_Blocks_Table();
        $this->_structure       = new Catalog_Conditioning_Blocks_Structure();
    }
}