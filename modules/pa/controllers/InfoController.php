<?php

/**
 * Common data controller
 */
class PA_InfoController extends Xend_Controller_Action
{

    /**
     * @var Xend_Accounts
     * */
    protected $_accounts;

    public function init()
    {
        $this->_accounts = new Xend_Accounts();
        $this->_profiles = new PA_Profile();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->pa->info);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-account-list');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-account-info');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'download');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-contacts');
    }

    public function getAccountListAction()
    {
        $response = $this->_accounts->fetchAllNames($this->_getAllParams());
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->total = $response->total;
        $this->view->data = $response->getRowset();
        $this->view->success = true;
    }

    public function getAccountInfoAction()
    {
        $response = $this->_profiles->fetchAccount($this->_getParam('id'));
        if ($response->isSuccess()) {
            $row = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $row;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function downloadAction()
    {
        $id = intval($this->_getParam('id'));
        $file = new Xend_File();
        $download = $file->download($id);
        if ($download->isError()) {
            $this->_collectErrors($download);
            return;
        }
        $this->view->success = true;
    }

    /**
     * List of account contacts
     */
    public function getContactsAction()
    {
        $accId = Xend_Accounts_Prototype::getId();

        $response = $this->_accounts->fetchContacts($accId, $this->_getAllParams());
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->total = $response->total;
        $this->view->data = $response->getRowset();
        $this->view->success = true;

    }
}