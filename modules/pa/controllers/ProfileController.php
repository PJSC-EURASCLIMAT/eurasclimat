<?php

/**
 * Default application conroller
 */
class PA_ProfileController extends Xend_Controller_Action
{

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->pa);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-expert');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-profile');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-profile');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'change-password');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'register-expert');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'edit-expert');
    }

    public function init()
    {
        $this->_model = new PA_Profile();
        $this->_expertsModel = new Experts_Experts_Model();

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

    public function getExpertAction()
    {
        $auth = Zend_Auth::getInstance();
        $Identity = $auth->getIdentity();
        $id = (null == $Identity) ? 0 : intval($Identity->id);
        $response = $this->_expertsModel->getByAccountId($id);

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->data = $response->getRowSet();
        $this->view->success = true;
    }

    public function editExpertAction()
    {
        $auth = Zend_Auth::getInstance();
        $Identity = $auth->getIdentity();
        $id = (null == $Identity) ? 0 : intval($Identity->id);

        $data = $this->_getAllParams();

        $expertId = $this->_expertsModel->getExpertIdByAccountId($id);
        $response = $this->_expertsModel->update($data);


        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->data = $response->getRowSet();
        $this->view->success = true;
    }

    public function registerExpertAction()
    {
        $auth = Zend_Auth::getInstance();
        $Identity = $auth->getIdentity();
        $id = (null == $Identity) ? 0 : intval($Identity->id);
        $data = $this->_getAllParams();

        $data['account_id'] = $id;
        $data['author_id'] = $id;
        $response = $this->_expertsModel->add($data);

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->data = $response->id;
        $this->view->success = true;
    }

    public function updateProfileAction()
    {

        $auth = Zend_Auth::getInstance();
        $Identity = $auth->getIdentity();
        $data = $this->_getAllParams();
        $data['id'] = $Identity->id;
        $data['active'] = $Identity->active;

        $id = (null == $Identity) ? 0 : intval($Identity->id);
        $response = $this->_model->update($data);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
//        $this->view->data = $response->getRowSet();
        $this->view->success = true;
    }

    public function changePasswordAction()
    {

        $auth = Zend_Auth::getInstance();
        $Identity = $auth->getIdentity();
        $data = $this->_getAllParams();
        $data['id'] = $Identity->id;
        $data['active'] = $Identity->active;

        $id = (null == $Identity) ? 0 : intval($Identity->id);
        $response = $this->_model->chPassword($id, $data);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->data = $response->getRowSet();
        $this->view->success = true;
    }
}