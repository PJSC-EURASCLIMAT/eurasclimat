<?php

/**
 * Default application conroller
 */
class PersonsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Xend_Accounts();
        parent::init();
    }

    public function getAction()
    {
        $response = $this->_model->fetchAccount($this->_getParam('id'));
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->rows = $response->getRowset();
        $this->view->success = true;
    }
}