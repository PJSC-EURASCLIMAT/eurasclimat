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
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->pa->info);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-account-list');
    }

    /**
     * The main access point into application
     */
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
}