<?php

class Admin_AclRoleController extends Xend_Controller_Action
{
    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->admin);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'fetch-roles');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'fetch-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'rename-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-role');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'remove-role');
    }

    public function fetchRolesAction()
    {
        $parentId = $this->_getParam('node');

        // allowed for future supporting parents
        if ($parentId) {
            return;
        }
        $roles = new Xend_Acl_Roles();
        $response = $roles->fetchRoles();
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $rows = $response->getRowset();
        foreach ($rows as & $row) {
            $row['text'] = $row['name'];
            unset($row['name']);
        }
        $this->view->assign($rows);
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
        $id = $this->_getParam('id');
        $roles = new Xend_Acl_Roles();
        $response = $roles->delete($id);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;
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
        $response = $roles->update($this->_getParam('id'), $this->_getAllParams());
        $success = $response->isSuccess();
        $this->view->rowset = array();

        $this->view->success = $success;
        if (!$success) {
            $this->_collectErrors($response);
        }
    }
}