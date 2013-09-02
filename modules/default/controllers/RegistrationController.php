<?php

/**
 * Default application conroller
 */
class RegistrationController extends Xend_Controller_Action
{
    /**
     * The main access point into application
     */
    public function indexAction()
    {
    }

    public function registerAction()
    {
        $model = new Xend_Accounts();
        $response = $model->createAccount($this->_getAllParams());

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $resp = $model->setRoles(intval($response->id), USER_ROLE);
        if ($resp->isError()) {
            $this->_collectErrors($resp);
            return;
        }


        $this->view->success = true;
    }

    public function checkLogin()
    {
        $model = new Xend_Accounts();
        $response = $model->accoutExists($this->_getParam('login'));

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->exists = $model->exists;
        $this->view->success = true;
    }
}