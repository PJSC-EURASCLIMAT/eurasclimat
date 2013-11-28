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

    /**
     * @var Xend_Accounts
     * */
    protected $_accounts;

    public function init()
    {
        $this->_model = new Sysdev_Projects_Model();
        $this->_accounts = new Xend_Accounts();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->sysdev);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-tree');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'rename');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'change-stage');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'move');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-account-list');
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
        $stage = (isset($data['stage']) || !empty($data['stage']))
               ? $data['stage']
               : $this->_getParam('stage');

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

    public function changeStageAction()
    {


        $data = $this->_getAllParams();

        $response = $this->_model->changeStage($data);

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;

    }


    public function deleteAction()
    {
        $data = Zend_Json::decode($this->_getParam('data'));

        $response = $this->_model->delete($data);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
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

    public function getAccountListAction()
    {
        $response = $this->_accounts->fetchAllNames($this->_getAllParams());
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->total = $response->total;
        $this->view->rows = $response->getRowset();
        $this->view->success = true;
    }

}
