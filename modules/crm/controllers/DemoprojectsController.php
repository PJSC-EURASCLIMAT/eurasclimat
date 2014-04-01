<?php

class Crm_DemoprojectsController extends Xend_Controller_Action
{

    /**
     * @var model
     */
    protected $_model;

    public function init()
    {
        $this->_model = new Crm_Demoprojects_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->crm->demoprojects);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'help');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-base-descr');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-base-descr');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-config');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-config');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-plans');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-plans');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-members');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-member');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-member');
    }

    public function helpAction()
    {}

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

    public function getBaseDescrAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRow();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateBaseDescrAction()
    {
        $response = $this->_model->updateBaseDescr($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getConfigAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRow();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateConfigAction()
    {
        $response = $this->_model->updateConfig($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getPlansAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRow();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updatePlansAction()
    {
        $response = $this->_model->updatePlans($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getMembersAction()
    {
        $model = new Crm_Demoprojects_Members_Model();
        $response = $model->get($this->_getParam('project_id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function addMemberAction()
    {
        $model = new Crm_Demoprojects_Members_Model();
        $response = $model->add(
            $this->_getParam('project_id'),
            $this->_getParam('account_id'),
            $this->_getParam('role')
        );
        if ($response->isSuccess()) {
            $this->view->data = $response->data;
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function deleteMemberAction()
    {
        $model = new Crm_Demoprojects_Members_Model();
        $response = $model->delete($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->data = $response->data;
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }
}