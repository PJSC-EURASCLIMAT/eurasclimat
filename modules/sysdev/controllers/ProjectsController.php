<?php

/**
 * Projects Controller conroller
 */
class Sysdev_ProjectsController extends Xend_Controller_Action
{

    /**
     * @var Sysdev_Projects_Model
     */
    protected $_model;
    
    public function init()
    {
        $this->_model = new Sysdev_Projects_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->projectdev);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-tree');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'rename');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'move');
    }

    public function getTreeAction()
    {

        $data = $this->_getAllParams();
        
        $response = $this->_model->fetchBranch($data);
        
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        
        $this->view->success = true;
        $this->view->children = $response->getRowset();

    }
    
    public function createAction()
    {

        $data = Zend_Json::decode($this->_getParam('data'));
        $stage = $this->_getParam('stage');

        $auth = Zend_Auth::getInstance();
        $identity = $auth->getIdentity();

        $data['account_id'] = $identity->id;

        $response = $this->_model->add($stage, $data);
        
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        
        $this->view->success = true;
        $this->view->children = $response->getRowset();

    }

    public function renameAction()
    {
        
        $data = Zend_Json::decode($this->_getParam('data'));
        
        $response = $this->_model->rename($data);
        
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        
        $this->view->success = true;

    }

    public function deleteAction()
    {
        function rrmdir($dir) {
            if (is_dir($dir)) {
                $objects = scandir($dir);
                foreach ($objects as $object) {
                    if ($object != "." && $object != "..") {
                        if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object);
                    }
                }
                reset($objects);
                rmdir($dir);
            }
        }

        $data = Zend_Json::decode($this->_getParam('data'));
        
        $response = $this->_model->delete($data);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $filePath = ROOT_DIR . DIRECTORY_SEPARATOR . 'httpdocs'. DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR . 'sysdev' . DIRECTORY_SEPARATOR . 'docs' . DIRECTORY_SEPARATOR .$data['id'];

        if (file_exists($filePath)) {
            rrmdir($filePath);
        }


        $this->view->success = true;
        
    }
    
    public function moveAction() {
        
        $data = $this->_getAllParams();
        
        $response = $this->_model->move($data);
        
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        
        $this->view->success = true;
        
    }

}
