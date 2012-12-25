<?php

/**
 * Default application conroller
 */
class NewsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new News_Main();
        parent::init();
    }

    public function indexAction()
    {
        $response = $this->_model->getList($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

}