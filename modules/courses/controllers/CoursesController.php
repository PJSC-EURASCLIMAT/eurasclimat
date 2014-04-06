<?php

/**
 * Project Docs Controller conroller
 */
class Courses_CoursesController extends Xend_Controller_Action
{
    /**
     * @var Xend_Tree_Model
     * */
    protected $_model;

    public function init()
    {
        $this->_model = new Courses_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->courses);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy');
    }

    public function readAction()
    {
        $response = $this->_model->getAll(null, $this->_getAllParams());
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
            $this->view->total = $response->total;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
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
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
            $this->view->success = false;
            return;
        }
        $this->view->success = true;
    }

    public function createAction()
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

    public function destroyAction()
    {
        $data= $this->_getAllParams();

        $deleteResponse = $this->_model->delete($data);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }

}