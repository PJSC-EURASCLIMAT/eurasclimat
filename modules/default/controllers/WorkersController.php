<?php

/**
 * Default application conroller
 */
class WorkersController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Xend_Accounts();
        parent::init();
    }

    public function indexAction()
    {
        $response = $this->_model->fetchAllWithRoles($this->_getAllParams());
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->rows = $response->getRowset();
        $this->view->success = true;
    }
}