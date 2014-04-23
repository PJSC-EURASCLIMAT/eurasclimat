<?php

class Catalog_InfoController extends Catalog_AbstractController
{
    public function init()
    {
        $category = $this->_getParam('category');
        //TODO split . в small,  каждому ucfirst,  join _
        $modelClass = 'Catalog_' . ucfirst($category) . '_Model';

        $this->_entity = $category;
        $this->_model = new $modelClass();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->catalog);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
    }

    public function getAction()
    {
        $response = $this->_model->getInfo($this->_getParam('id'));
        if ($response->isSuccess()) {
            $row = $response->getRow();
            $model = new Catalog_Images($this->_entity);
            $resp = $model->getAll($this->_entity, $row['id']);
            if ($resp->hasNotSuccess()) {
                $row['images'] = array();
            } else {
                $row['images'] = $resp->getRowset();
            }
            $this->view->success = true;
            $this->view->data = $row;
        } else {
            $this->_collectErrors($response);
        }
    }
}