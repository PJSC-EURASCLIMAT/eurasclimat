<?php

class Crm_ProjectsGroupsController extends Xend_Controller_Action
{

    /**
     * @var model
     */
    protected $_model;

    public function init()
    {
        $this->_model = new Crm_Projects_Groups_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->projects);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->admin);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
    }

    public function getListAction()
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

    public function addAction()
    {
        $response = $this->_model->add($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
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

    public function deleteAction()
    {
        $id = intval($this->_getParam('id'));
        $response = $this->_model->delete($id);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }
}
