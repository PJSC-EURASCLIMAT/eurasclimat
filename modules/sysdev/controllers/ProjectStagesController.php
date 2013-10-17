<?php

/**
 * Project Stages Controller conroller
 */
class Sysdev_ProjectStagesController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Sysdev_ProjectStages_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->sysdev->stages);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by-project');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-chart-by-project');
    }

    public function getByProjectAction()
    {
        $response = $this->_model->getByProject($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getChartByProjectAction()
    {
        $response = $this->_model->getChartByProject($this->_getParam('project_id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = 99;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {

//        $data = Zend_Json::decode($this->_getParam('data'));
        $data = $this->_getAllParams();

        $response = $this->_model->saveInfo($data);

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;

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

    public function addAction()
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

}