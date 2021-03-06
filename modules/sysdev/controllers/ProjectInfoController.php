<?php

/**
 * Project Info Controller conroller
 */
class Sysdev_ProjectInfoController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Sysdev_Projects_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->sysdev->info);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'save');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-full-desc');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'save-full-desc');
    }
    
    public function getAction()
    {
        $response = $this->_model->getInfo($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->data = $response->getRow();
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }
    
    public function saveAction()
    {

        $data = $this->_getAllParams();
        
        $response = $this->_model->saveInfo($data);
        
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        
        $this->view->success = true;
        
    }

    public function getFullDescAction()
    {

        $response = $this->_model->getFullDescription($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->data = $response->getRow();
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }

    }

    public function saveFullDescAction()
    {

        $data = $this->_getAllParams();

        $response = $this->_model->saveFullDescription($data);

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;

    }
}