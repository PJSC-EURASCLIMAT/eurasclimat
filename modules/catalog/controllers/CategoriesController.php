<?php

class Catalog_CategoriesController extends OSDN_Controller_Action
{
	/**
	 * @var model
	 */
	protected $_model;

	public function init()
	{
		$this->_model = new Catalog_Categories();
		parent::init();
	}

    public function permission(OSDN_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(OSDN_Acl_Resource_Generator::getInstance()->catalog);
        $acl->isAllowed(OSDN_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(OSDN_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(OSDN_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(OSDN_Acl_Privilege::UPDATE, 'delete');
    }

	public function getAction()
    {
        $response = $this->_model->getListByParent($this->_getParam('node'));
        if ($response->isSuccess()) {
            $this->view->assign($response->getRowset());
        } else {
            $this->_collectErrors($response);
        }
    }

    public function addAction()
    {
        $response = $this->_model->add($this->_getParam('name'), $this->_getParam('parent'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $response = $this->_model->update($this->_getParam('name'), $this->_getParam('node'));
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function deleteAction()
    {
        $response = $this->_model->delete($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }
}