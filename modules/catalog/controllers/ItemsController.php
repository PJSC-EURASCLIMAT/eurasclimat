<?php

class Catalog_ItemsController extends OSDN_Controller_Action
{

    public function permission(OSDN_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(OSDN_Acl_Resource_Generator::getInstance()->catalog);
        $acl->isAllowed(OSDN_Acl_Privilege::VIEW, 'index');
    }

    public function indexAction()
    {
    }
}