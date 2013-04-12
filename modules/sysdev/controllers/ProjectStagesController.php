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
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->projectdev->stages);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by-project');
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

}