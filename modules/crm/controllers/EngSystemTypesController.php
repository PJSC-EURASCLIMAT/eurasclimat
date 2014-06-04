<?php

class Crm_EngSystemTypesController extends Xend_Controller_Action
{
    protected $_model;

    public function init()
    {
        $this->_model = new Crm_EngSystemTypes_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->crm->eng_system_types);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy');
    }

    public function createAction()
    {
        $params =  $this->_getAllParams();
        $data = Zend_Json::decode($params['data']);

        $response = $this->_model->create($data);
        if ( $response->isSuccess() ) {
            $this->view->success = true;
            $this->view->data = array('id' => $response->id);
        } else {
            $this->_collectErrors($response);
        }
    }

    public function readAction()
    {
        $params =  $this->_getAllParams();

        $response = $this->_model->read( $params );
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
            $this->view->total = $response->total;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $params =  $this->_getAllParams();
        $data = Zend_Json::decode($params['data']);

        $response = $this->_model->update($data);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

//    public function getAction()
//    {
//        $response = $this->_model->get($this->_getParam('id'));
//        if ($response->isSuccess()) {
//            $row = $response->getRow();
//            $model = new Catalog_Images($this->_entity);
//            $resp = $model->getAll($this->_entity, $row['id']);
//            if ($resp->hasNotSuccess()) {
//                $row['images'] = array();
//            } else {
//                $row['images'] = $resp->getRowset();
//            }
//            $this->view->success = true;
//            $this->view->data = $row;
//        } else {
//            $this->_collectErrors($response);
//        }
//    }



    public function destroyAction()
    {
        $params =  $this->_getAllParams();
        $data = Zend_Json::decode($params['data']);

        $response = $this->_model->destroy($data);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

}