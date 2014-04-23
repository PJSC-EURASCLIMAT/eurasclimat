<?php

class Catalog_InfoController extends Catalog_AbstractController
{
    public function init()
    {
        $category = $this->_getParam('category');

        $catArr = explode('_', $category);

        for ( $i = 0; $i < count($catArr); $i++ ) {
            $catArr[$i] = ucfirst($catArr[$i]);
        }

        $modelClass = 'Catalog_' . join('_',$catArr) . '_Model';

        if ( !class_exists( $modelClass ) ) {
            //TODO нужно как-то подобающе ругнуться
            return false;
        }

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