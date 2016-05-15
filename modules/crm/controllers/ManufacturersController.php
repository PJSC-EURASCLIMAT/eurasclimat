<?php

class Crm_ManufacturersController extends Xend_Controller_Action
{
    protected $_model;

    public function init()
    {
        $this->_model = new Crm_Manufacturers_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->pa);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read');
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->admin);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy');
    }

    public function readAction()
    {
        $response = $this->_model->read();
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function createAction()
    {
        $response = $this->_model->create(Zend_Json::decode($this->_getParam('data')));
        if ( $response->isSuccess() ) {
            $this->view->success = true;
            //$this->view->id = $response->id;
            $this->view->data = $response->getRow();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $response = $this->_model->update(Zend_Json::decode($this->_getParam('data')));
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function destroyAction()
    {
        $response = $this->_model->destroy(Zend_Json::decode($this->_getParam('data')));
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }
}