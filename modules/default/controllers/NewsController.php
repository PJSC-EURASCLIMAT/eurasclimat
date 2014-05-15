<?php

/**
 * Default application conroller
 */
class NewsController extends Xend_Controller_Action
{
    protected $_model;

    protected $_cat_model;


    public function init()
    {
        $this->_model = new News_Main();
        $this->_cat_model = new News_MainCategories();
        parent::init();
    }

    public function indexAction()
    {
        $response = $this->_model->getList($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->news);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-categories');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-category');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-category');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-category');
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $response = $this->_model->update($this->_getAllParams());
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
            $this->view->success = false;
            return;
        }
        $this->view->success = true;
    }

    public function addAction()
    {
        $modResponse = $this->_model->add($this->_getAllParams());

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
        $deleteResponse = $this->_model->delete($this->_getAllParams());
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }


    // categories actions

    public function getCategoriesAction()
    {
        $response = $this->_cat_model->getList($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }


    public function updateCategoryAction()
    {
        $response = $this->_cat_model->update($this->_getAllParams());
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
            $this->view->success = false;
            return;
        }
        $this->view->success = true;
    }

    public function addCategoryAction()
    {
        $modResponse = $this->_cat_model->add($this->_getAllParams());

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {
            $this->view->success = true;
            $this->view->id = $modResponse->id;
        }

    }

    public function deleteCategoryAction()
    {
        $deleteResponse = $this->_cat_model->delete($this->_getAllParams());
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }



}