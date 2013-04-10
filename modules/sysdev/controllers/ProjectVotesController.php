<?php

/**
 * Project Votes Controller conroller
 */
class Sysdev_ProjectVotesController extends Sysdev_AbstractController
{

    public function init()
    {
        $this->_model = new Sysdev_ProjectVotes_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->projectdev->votes);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by-project');
    }

}