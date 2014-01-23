<?php

/**
 * Project Docs Controller conroller
 */
class Experts_ExpertsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Experts_Experts_Model();
        $this->_expertsDocsModel = new Experts_ExpertsDocs_Model();

        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->experts->moderation);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'activate');

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-expert-docs');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-expert-doc');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'upload-expert-doc');

        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->experts);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-active-list');
    }

    public function getListAction()
    {
        $response = $this->_model->getAll(null);
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getActiveListAction()
    {
        $response = $this->_model->getAll(array('e.active = ?',1));
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        $fromCurrent = $this->_getParam('fromCurrent');
        if ($response->isSuccess()) {
            $row = $response->getRow();
            $this->view->success = true;
            $this->view->data = $row;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function activateAction()
    {
        $data = array();
        $data['id'] = $this->_getParam('id');
        $data['active'] = $this->_getParam('active');

        $response = $this->_model->activate($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
        $this->view->success = true;
    }


    public function updateAction()
    {
        $response = $this->_model->update($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
        $this->view->success = true;
    }

    public function addAction()
    {
        $data= $this->_getAllParams();

        $modResponse = $this->_model->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {
            $this->view->success = true;
            $this->view->id = $modResponse->id;
        }

    }

    public function deleteAction()
    {
        $id = intval($this->_getParam('id'));

        $deleteResponse = $this->_model->delete($id);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
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