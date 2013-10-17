<?php

/**
 * Project Discussions Controller conroller
 */
class Sysdev_ProjectDiscussionsController extends Sysdev_AbstractController
{

    public function init()
    {
        $this->_model = new Sysdev_ProjectDiscussions_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->sysdev->comments);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by-project');
    }

}