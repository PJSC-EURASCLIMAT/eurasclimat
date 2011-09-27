<?php

class Catalog_Settings_TableFactory extends OSDN_Db_Table_Abstract
{
    public function __construct($entity)
    {
        parent::__construct(array('name' => 'catalog_' . $entity));
    }
}