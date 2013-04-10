<?php

class Sysdev_AbstractController extends Xend_Controller_Action
{

    /**
     * @var model
     */
    protected $_model;

    protected $_entity;

    public function addAction()
    {
        $response = $this->_model->add(Zend_Json::decode( $this->_getParam('data')));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getByProjectAction()
    {
        $response = $this->_model->getByProject($this->_getParam('project_id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }
}