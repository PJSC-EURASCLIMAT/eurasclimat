<?php

class Catalog_IndexController extends OSDN_Controller_Action
{

    public function permission(OSDN_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(OSDN_Acl_Resource_Generator::getInstance()->admin);
        $acl->isAllowed(OSDN_Acl_Privilege::VIEW, 'index');
    }

    public function indexAction()
    {
        $a = new Catalog_Main();
        die($a->foo);
    }
}