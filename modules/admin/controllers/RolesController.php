<?php

class Admin_RolesController extends Xend_Controller_Action
{
    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->admin);
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create-role');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list-checked');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'remove-role');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'fetch-role');
    }

    public function createRoleAction()
    {
        $roles = new Xend_Acl_Roles();
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $roles->createRole($data);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->id = $response->id;
        $this->view->success = true;
    }

    public function getListAction()
    {
        $roles = new Xend_Acl_Roles();
        $response = $roles->fetchRolesTree();
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $rows = $response->getRowset();
        $this->view->assign(array('children' => $rows));
    }

    public function getListCheckedAction()
    {
        $roles = new Xend_Acl_Roles();
        $response = $roles->fetchRolesTree(true);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $rows = $response->getRowset();
        $this->view->assign(array(
            'checked' => false,
            'expanded' => true,
            'leaf' => false,
            'children' => $rows
        ));
    }

    public function removeRoleAction()
    {
        $roles = new Xend_Acl_Roles();
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $roles->delete($data['id']);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function updateRoleAction()
    {
        $roles = new Xend_Acl_Roles();
        $data = Zend_Json::decode($this->_getParam('data'));
        $response = $roles->update($data);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function fetchRoleAction()
    {
        $id = $this->_getParam('id');
        $roles = new Xend_Acl_Roles();
        $response = $roles->fetchRole($id);
        $rowset = array();

        $this->view->success = $success = $response->isSuccess();
        if ($success) {
            $rowset = array($response->getRow());
        } else {
            $this->_collectErrors($response);
        }

        $this->view->rowset = $rowset;
    }
}