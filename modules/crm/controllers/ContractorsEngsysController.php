<?php

class Crm_ContractorsEngsysController extends Xend_Controller_Action
{
    protected $_model;

    public function init()
    {
        $this->_model = new Crm_Contractors_EngsysModel();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->crm->contractors);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
    }

    public function getAction()
    {
        $response = $this->_model->getByContractorId($this->_getParam('contractor_id'));
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function addAction()
    {
        $response = $this->_model->add($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }
    
    public function deleteAction()
    {
        $response = $this->_model->delete($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }
}