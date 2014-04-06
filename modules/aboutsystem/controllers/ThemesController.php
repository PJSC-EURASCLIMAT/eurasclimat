<?php

/**
 * Default application conroller
 */
class Aboutsystem_ThemesController extends Xend_Controller_Action
{

    public function init()
    {
//        $this->_model = new Aboutsystem_Themes_Model();
        $nullablse_fields = array(
            'parent_id',
            'account_id'
        );
        $this->_model = new Xend_Tree_Model('aboutsystem_themes', $nullablse_fields);
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->aboutsystem);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy');

//        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-tree');
    }

    public function createAction()
    {
        $response = $this->_model->create($this->_getAllParams());

        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = array('id' => $response->id);
        } else {
            $this->_collectErrors($response);
        }
    }

    public function readAction()
    {
        $response = $this->_model->read(null, $this->_getAllParams());

        if ( $response->isSuccess() ) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
//            $this->view->total = $response->total;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $response = $this->_model->update($this->_getAllParams());

        if ( $response->isSuccess() ) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function destroyAction()
    {
        $response = $this->_model->destroy($this->_getAllParams());

        if ( $response->isSuccess() ) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

//
//    public function getTreeAction()
//    {
//        $response = $this->_model->fetchBranch(0);
//        if ($response->isSuccess()) {
//            $this->view->success = true;
//            $rows = $response->getRowset();
//            $this->view->assign(array('children' => $rows));
//        } else {
//            $this->_collectErrors($response);
//        }
//    }

}