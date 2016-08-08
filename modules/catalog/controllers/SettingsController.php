<?php

class Catalog_SettingsController extends Xend_Controller_Action
{
	/**
	 * @var model
	 */
	protected $_model;

	public function init()
	{
		$this->_model = new Catalog_Settings($this->_getParam('entity'));
		parent::init();
	}

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->catalog);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
    }

    public function getListAction()
    {
        $response = $this->_model->getAll($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function addAction()
    {
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $this->_model->add($data['name']);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $this->_model->update($data['name'], $data['id']);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function deleteAction()
    {
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $this->_model->delete($data['id']);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }
}