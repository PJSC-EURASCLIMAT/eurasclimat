<?php

/**
 * Default application conroller
 */
class ManufacturersController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Xend_Acl_Roles();
        parent::init();
    }

    public function indexAction()
    {
        $response = $this->_model->fetchRolesBranch(2);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $rows = $response->getRowset();
            $this->view->assign(array('children' => $rows));
        } else {
            $this->_collectErrors($response);
        }
    }

}