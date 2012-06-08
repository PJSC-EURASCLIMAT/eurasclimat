<?php

class Admin_RolesController extends Xend_Controller_Action
{
    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->admin);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'fetch-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'rename-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'remove-role');
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
        $this->view->assign(array('text' => '.', 'children' => $rows));
    }

    public function renameRoleAction()
    {
        $roleId = $this->_getParam('node');
        $text = $this->_getParam('text');
        $roles = new Xend_Acl_Roles();
        $response = $roles->rename($roleId, $text);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;
    }

    public function createRoleAction()
    {
        $name = $this->_getParam('name');
        $roles = new Xend_Acl_Roles();
        $response = $roles->createRole($name);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->id = $response->id;
        $this->view->success = true;
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
}