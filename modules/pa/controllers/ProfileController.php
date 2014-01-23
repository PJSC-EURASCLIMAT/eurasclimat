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

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-expert-docs');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-expert-doc');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'upload-expert-doc');

    }

    public function init()
    {
        $this->_model = new PA_Profile();
        $this->_expertsModel = new Experts_Experts_Model();
        $this->_expertsDocsModel = new Experts_ExpertsDocs_Model();

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
        $data['id'] = $expertId;
        $data['account_id'] = $id;

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

        $this->view->passReset = null;

        if(!empty($data['old_password'])
            && !empty($data['new_password1'])
            && !empty($data['new_password2'])
        ) {
            $passResponse = $this->_model->chPassword($id, $data);
            if ($passResponse->isError()) {
                $this->_collectErrors($passResponse);
                $this->view->passReset = false;
                return;
            }
        }
        $this->view->success = true;
    }


    public function uploadExpertDocAction()
    {
        $expert_id = intval($this->_getParam('expert_id'));

        $data['expert_id'] = $expert_id;

        if ($expert_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'expert_id'));
            $this->_collectErrors($response);
            return;
        }

//        $data['name'] = $_GET['X-File-Name'];

        $modResponse = $this->_expertsDocsModel->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {
            $this->view->success = true;
        }

    }

    public function deleteExpertDocAction()
    {
        $data = $this->_getAllParams();

        $deleteResponse = $this->_expertsDocsModel->delete($data);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }

    public function getExpertDocsAction()
    {
        $expert_id = intval($this->_getParam('expert_id'));

        if ($expert_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'expert_id'));
            $this->_collectErrors($response);
            return;
        }

        $response = $this->_expertsDocsModel->getByExpert($expert_id);

        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }
}