<?php

/**
 * Project Discussions Controller
 */
class Crm_ProjectsDiscussionsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Crm_Projects_Discussions_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->projects);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by-project');
    }

    public function addAction()
    {
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $this->_model->add($data);
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