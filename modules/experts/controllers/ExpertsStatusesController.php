<?php

/**
 * Personal Account Messages Controller
 */
class Experts_ExpertsStatusesController extends Xend_Controller_Action
{

    /**
     * @var PA_Messages_Model
     * */
    protected $_model;

    public function init()
    {
        $this->_model = new Experts_Statuses_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->experts->statuses);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
    }


    /**
     * List of messages
     */
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

    public function updateAction()
    {
        $data = $this->_getAllParams();
        $response = $this->_model->update($data);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }


    public function addAction ()
    {
        $data = $this->_getAllParams();

        $response = $this->_model->add($data);

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


}