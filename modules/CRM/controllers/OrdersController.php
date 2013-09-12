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

}