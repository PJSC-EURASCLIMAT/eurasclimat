<?php

/**
 * Project Docs Controller conroller
 */
class Experts_ExpertsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Experts_Experts_Model();

        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->experts);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
    }

    public function getListAction()
    {
        $response = $this->_model->getAll();
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getByAction()
    {
        $params = $this->_getAllParams();

        $response = $this->_model->getByProject($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
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
        $this->view->success = true;
    }

    public function addAction()
    {
        $data= $this->_getAllParams();

        $modResponse = $this->_model->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {
            $this->view->success = true;
            $this->view->id = $modResponse->id;
        }

    }

    public function deleteAction()
    {
        $id = intval($this->_getParam('id'));

        $deleteResponse = $this->_model->delete($id);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }


}