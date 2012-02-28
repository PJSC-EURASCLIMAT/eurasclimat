<?php

class ConfigController extends Xend_Controller_Action
{
    public function getPermissionsAction()
    {
        $this->disableLayout(true);

        $acl = Xend_Accounts_Prototype::getAcl();
        $aclCollection = array();
        if (!empty($acl)) {
            $aclCollection = (object) $acl->toArray();
        };
        $this->view->acl = $aclCollection;

        $resourceCollection = array();
        $resource = new Xend_Acl_Resource();
        $response = $resource->fetchAll();
        if ($response->isSuccess()) {
            foreach (@$response->rows as $row) {
                $resourceCollection[] = array($row['id'], strtolower($row['name']), $row['parent_id']);
            }
        }

        $this->view->resources = $resourceCollection;
        $privilege = Xend_Acl_Privilege::fetchAll();
        $this->view->privileges = (object) $privilege;
    }
}