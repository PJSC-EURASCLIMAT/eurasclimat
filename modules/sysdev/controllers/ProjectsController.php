<?php

/**
 * Projects Controller conroller
 */
class Sysdev_ProjectsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Sysdev_Projects_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->projectdev);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-tree');
    }

    public function getTreeAction()
    {
        $response = $this->_model->fetchBranch(0);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $rows = $response->getRowset();
            $this->view->assign(array('children' => $rows));
        } else {
            $this->_collectErrors($response);
        }
    }

}