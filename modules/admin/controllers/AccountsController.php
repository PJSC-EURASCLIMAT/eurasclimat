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
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-accounts');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'fetch');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'change-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-field');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-account');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-account');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'change-password');
    }

    public function init()
    {
        $this->_accounts = new Xend_Accounts();
        parent::init();
    }

    public function getAccountsAction()
    {
        $roleId = $this->_getParam('roleId');
        $response = $this->_accounts->fetchByRole($roleId);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->rows = $response->getRowset();
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

    public function updateAction()
    {
        $response = $this->_accounts->update($this->_getParam('id'), $this->_getAllParams());
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;
    }

    public function updateFieldAction()
    {
        $id = $this->_getParam('id');
        $field = $this->_getParam('field');
        $value = $this->_getParam('value');
        $response = $this->_accounts->updateByField($id, $field, $value);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->success = true;
    }

    public function addAccountAction()
    {
        $response = $this->_accounts->createAccount(array(
            'login'     => $this->_getParam('login'),
            'password'  => $this->_getParam('password'),
            'roleId'    => $this->_getParam('roleId')
        ));

        if ($response->isError()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
            $this->view->errors = array();
        }
    }

    public function deleteAccountAction()
    {
        $response = $this->_accounts->deleteAccount($this->_getParam('id'));
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

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

    public function changeRoleAction()
    {
        $accountIds = $this->_getParam('accountIds');
        $accountIds = Zend_Json::decode($accountIds);
        $roleId = $this->_getParam('roleId');
        $response = $this->_accounts->changeRole($accountIds, $roleId);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->success = true;
    }
}