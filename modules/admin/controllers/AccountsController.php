<?php

class Admin_AccountsController extends Xend_Controller_Action
{
    /**
     * Accounts object
     *
     * @var Xend_Accounts
     */
    protected $_accounts;

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->admin);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create-account');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-account');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-field');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-account');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'fetch');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'set-roles');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'change-password');
    }

    public function init()
    {
        $this->_accounts = new Xend_Accounts();
        parent::init();
    }

    public function createAccountAction()
    {
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $this->_accounts->createAccount($data);

        if ($response->isError()) {
            $this->_collectErrors($response);
        } else {
           $this->view->id = $response->id;
            $this->view->success = true;
        }
    }

    public function getListAction()
    {
        $response = $this->_accounts->fetchAllWithRoles($this->_getAllParams());
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->totalcount = $response->total;
        $this->view->rows = $response->getRowset();
        $this->view->success = true;
    }

    public function updateAccountAction()
    {
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $this->_accounts->update($data);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;
    }

    public function deleteAccountAction()
    {
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $this->_accounts->deleteAccount($data['id']);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;
    }

    public function fetchAction()
    {
        $response = $this->_accounts->fetchAccount($this->_getParam('id'));
        if ($response->isError()) {
            $this->_collectErrors($response);
            $this->view->rows = array();
            return;
        }

        $this->view->rows = array($response->rowset);
        $this->view->success = true;
    }

    public function changePasswordAction()
    {
        $response = $this->_accounts->changePassword($this->_getParam('id'), $this->_getParam('password'));
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;
        $this->view->errors = array();
    }

    public function setRolesAction()
    {
        $id = $this->_getParam('id');
        $roles = Zend_Json::decode($this->_getParam('roles'));
        $response = $this->_accounts->setRoles($id, $roles);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->success = true;
    }
}