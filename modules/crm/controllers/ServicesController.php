<?php

class Crm_ServicesController extends Xend_Controller_Action
{



    public function init()
    {
        $nullablse_fields = array('parent_id');

        $this->_model = new Crm_Services_Model();
        $this->_chapterModel = new Xend_Tree_Model('services_chapters', $nullablse_fields);
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->crm->services);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy');
    }

    public function createAction()
    {
        $params = $this->_getAllParams();
        $data = Zend_Json::decode($params['data']);

        if ( $data['leaf'] == true ) {
            $response = $this->_model->create($data);
        } else {
            $response = $this->_chapterModel->create($params);
        }

        if ( $response->isSuccess() ) {
            $this->view->success = true;
            $this->view->data = array('id' => $response->id);
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $row = $response->getRow();
            $this->view->success = true;
            $this->view->data = $row;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function readAction()
    {
        $response = $this->_model->read($this->_getAllParams());

        if ( $response->isSuccess() ) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $params = $this->_getAllParams();
        $data = Zend_Json::decode($params['data']);


        if ( isset( $data['service_id'] ) && !empty( $data['service_id'] ) ) {
            $data['id'] = $data['service_id'];
            $response = $this->_model->update($data);
        } else {
            $response = $this->_chapterModel->update($params);
        }

//        $response = $this->_model->update($data);

        if ( $response->isSuccess() ) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function destroyAction()
    {
        $params = $this->_getAllParams();
        $data = Zend_Json::decode($params['data']);

        if ( isset( $data['service_id'] ) && !empty( $data['service_id'] ) ) {
            $data['id'] = $data['service_id'];
            $response = $this->_model->destroy($data);
        } else {
            $response = $this->_chapterModel->destroy($params);
        }
//        $response = $this->_model->destroy($this->_getAllParams());

        if ( $response->isSuccess() ) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

}