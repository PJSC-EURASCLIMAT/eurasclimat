<?php

/**
 * Project Docs Controller conroller
 */
class Courses_GroupsController extends Xend_Controller_Action
{
    /**
     * @var Xend_Tree_Model
     * */
    protected $_model;

    public function init()
    {
        $this->_model = new Xend_Tree_Model('courses_groups');
        parent::init();
    }

    // TODO вынести контроллер в Xend_Tree_Controller;

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        // TODO Создать отдельные пермишены для курсов экспертов
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->courses->groups);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy');
    }

    public function createAction()
    {
        $response = $this->_model->create($this->_getAllParams());

        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = array('id' => $response->id);
        } else {
            $this->_collectErrors($response);
        }
    }

    public function readAction()
    {
        $response = $this->_model->read(null, $this->_getAllParams());

        if ( $response->isSuccess() ) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
            $this->view->valueData = $response->valueRows;
//            $this->view->total = $response->total;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $response = $this->_model->update($this->_getAllParams());

        if ( $response->isSuccess() ) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function destroyAction()
    {
        $response = $this->_model->destroy($this->_getAllParams());

        if ( $response->isSuccess() ) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

}