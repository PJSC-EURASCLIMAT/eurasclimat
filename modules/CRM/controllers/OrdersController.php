<?php

//class Catalog_ExpendablesController extends Xend_Controller_Action
class CRM_OrdersController extends Xend_Controller_Action
{

    /**
     * @var model
     */
    protected $_model;

    public function init()
    {
        $this->_model = new CRM_Orders_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->crm->orders);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-order');
    }

    public function addOrderAction()
    {
        $auth = Zend_Auth::getInstance();
        $Identity = $auth->getIdentity();

        $data = $this->_getAllParams();
        $data['account_id'] = $Identity->id;

        $response = $this->_model->add($data);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
            $this->_collectErrors($response);
        }
    }

//    public function getListAction()
//    {
//        $response = $this->_model->getList($this->_getAllParams());
//        if ($response->isSuccess()) {
//            $this->view->success = true;
//            $this->view->data = $response->getRowset();
//            $this->view->total = $response->totalCount;
//        } else {
//            $this->_collectErrors($response);
//        }
//    }
//
//    public function getAction()
//    {
//        $response = $this->_model->get($this->_getParam('id'));
//        if ($response->isSuccess()) {
//            $this->view->success = true;
//            $this->view->data = $response->getRow();
//        } else {
//           $this->_collectErrors($response);
//        }
//    }
//
//    public function addAction()
//    {
//        $response = $this->_model->add($this->_getAllParams());
//        if ($response->isSuccess()) {
//            $this->view->success = true;
//            $this->view->id = $response->id;
//        } else {
//           $this->_collectErrors($response);
//        }
//    }
//
//    public function updateAction()
//    {
//        $response = $this->_model->update($this->_getAllParams());
//        if ($response->isSuccess()) {
//            $this->view->success = true;
//        } else {
//           $this->_collectErrors($response);
//        }
//    }
//
//    public function deleteAction()
//    {
//        $id = intval($this->_getParam('id'));
//        $response = $this->_model->delete($id);
//        if ($response->isSuccess()) {
//            $this->view->success = true;
//        } else {
//           $this->_collectErrors($response);
//        }
//    }
}