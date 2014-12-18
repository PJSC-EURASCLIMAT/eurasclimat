<?php

class Crm_ContractorsController extends Xend_Controller_Action
{
    protected $_model;

    public function init()
    {
        $this->_model = new Crm_Contractors_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->crm->contractors);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-info');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy');
    }

    public function getInfoAction()
    {
        $response = $this->_model->getInfo($this->_getParam('id'));
        if ($response->isSuccess()) {
            $row = $response->getRow();
            $this->view->success = true;
            $this->view->data = $row;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $row = $response->getRow();
            $this->view->success = true;
            $this->view->data = $row;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function createAction()
    {
        $response = $this->_model->create($this->_getAllParams());
        if ( $response->isSuccess() ) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function readAction()
    {
        $response = $this->_model->read();
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
            $this->view->total = $response->total;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $response = $this->_model->update($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function destroyAction()
    {
        $params =  $this->_getAllParams();
        $data = Zend_Json::decode($params['data']);

        $response = $this->_model->destroy($data);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }
}