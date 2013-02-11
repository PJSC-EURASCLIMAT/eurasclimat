<?php

/**
 * Default application conroller
 */
class PA_ProfileController extends Xend_Controller_Action
{

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->pa);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-profile');
    }

    public function init()
    {
        $this->_model = new Xend_Accounts();
        parent::init();
    }

    public function getProfileAction()
    {
        $auth = Zend_Auth::getInstance();
        $Identity = $auth->getIdentity();
        $id = (null == $Identity) ? 0 : intval($Identity->id);
        $response = $this->_model->fetchAccount($id);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->data = $response->getRowSet();
        $this->view->success = true;
    }
}