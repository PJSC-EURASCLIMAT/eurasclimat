<?php

class Xend_Acl_Permission
{
    /**
     * Permission table instance
     *
     * @var Xend_Acl_Table_Permission
     */
    protected $_tablePermission = null;

    /**
     * The constructor
     *
     */
    public function __construct()
    {
        $this->_tablePermission = new Xend_Acl_Table_Permission();
    }

    /**
     * Retrieve permissions by role id
     *
     * @param int $roleId
     * @return Xend_Response
     * <code>contain data {
     *     rows : array
     * }</code>
     */
    public function fetchAccountPermissions($accountId)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($accountId)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'account_id'));
            return $response;
        }

        $RolesAccounts = new Xend_Acl_Table_RolesAccounts();
        $roles = $RolesAccounts->getRolesByAccountId($accountId);

        try {
            $rowset = $this->_tablePermission->fetchAll(array('role_id IN (?)' => $roles));
            $response->setRowset($rowset->toArray());
            $status = Xend_Acl_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Acl_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new Xend_Acl_Status($status));
    }

    /**
     * Retrieve permissions by role id
     *
     * @param int $roleId
     * @return Xend_Response
     * <code>contain data {
     *     rows : array
     * }</code>
     */
    public function fetchByRoleId($roleId)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($roleId)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'roleid'));
            return $response;
        }

        try {
            $rowset = $this->_tablePermission->fetchAll(array('role_id = ?' => $roleId));
            $response->setRowset($rowset->toArray());
            $status = Xend_Acl_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Acl_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new Xend_Acl_Status($status));
    }

    /**
     * Retrive the permissions by role id
     *
     * @param int $roleId       The role id
     * @return Xend_Response
     */
    public function fetchPermission($roleId)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($roleId)) {
            return $response->addStatus(new Xend_Acl_Status(
                Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'role_id'));
        }

        $rows = $this->_tablePermission->fetchPermissions($roleId, 0);

        if (false !== $rows) {
            $status = Xend_Acl_Status::OK;
            $response->rows = $rows;
        } else {
            $status = Xend_Acl_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new Xend_Acl_Status($status));
    }

    /**
     * Set permission on resource for role
     *
     * @param int $roleId       The role id
     * @param int $resourceId   The resource id
     * @param string $privilege The privilege name  @see Xend_Acl_Privilege
     * @param mixed $value      The value
     *                           Value can be string, int or boolean
     *                           @see Xend_Validate_Boolean for choose allowed format
     * @return Xend_Response <code>
     * The possible returned data is:
     * array(
     *      id: int
     * )</code>
     */
    public function setPermission($roleId, $resourceId, $privilege, $value)
    {
        $validate = new Xend_Validate_Id();
        $response = new Xend_Response();
        if (!$validate->isValid($roleId)) {
            return $response->addStatus(new Xend_Acl_Status(
                Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'role_id'));
        }

        if (!$validate->isValid($resourceId)) {
            $response->addStatus(new Xend_Acl_Status(
                Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'resource_id'));
        }

        if (true !== Xend_Acl_Privilege::isExists($privilege)) {
            return $response->addStatus(new Xend_Acl_Status(
                Xend_Acl_Status::PRIVILEGE_DOES_NOT_EXISTS, 'privilege'));
        }

        $validateValue = new Xend_Validate_Boolean(true);
        if (!$validateValue->isValid($value)) {
            return $response->addStatus(new Xend_Acl_Status(
                Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'value'));
        }

        $booleanFilter = new Xend_Filter_Boolean(true);
        $value = $booleanFilter->filter($value);
        $privilegeId = Xend_Acl_Privilege::name2id($privilege);

        if (true === $value) {
            $id = $this->_tablePermission->insert(array(
                'role_id'       => $roleId,
                'resource_id'   => $resourceId,
                'privilege_id'     => $privilegeId
            ));

            if (false !== $id) {
                $status = Xend_Acl_Status::OK;
                $response->id = $id;
            } else {
                $status = Xend_Acl_Status::DATABASE_ERROR;
            }
            $response->addStatus(new Xend_Acl_Status($status));
            return $response;
        }

        $this->_deletePermission($roleId, $resourceId, $privilegeId);
        return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
    }

    /**
     * Cascading delete permission
     *
     * @param int $roleId           The role id
     * @param int $resourceId       The resource id
     * @param int $privilegeId      The privilege id
     * @return void
     */
    protected function _deletePermission($roleId, $resourceId, $privilegeId)
    {
        $resourceIds = array($resourceId);
        $tableResource = new Xend_Acl_Table_Resource();

        do {
            $affectedRows = false;
            foreach ($resourceIds as $id) {
                $affectedRows = $this->_tablePermission->deleteQuote(array(
                    'role_id = ?'       => $roleId,
                    'resource_id = ?'   => $id,
                    'privilege_id = ?'  => $privilegeId
                ));
            }

            $whereClause = $tableResource->getAdapter()->quoteInto('parent_id IN (?)', $resourceIds);
            $resourceIds = array();

            try {
                $rowset = $tableResource->fetchAll($whereClause);
                $rows = $rowset->toArray();
            } catch (Exception $e) {
                if (DEBUG) {
                    throw $e;
                }
                continue;
            }

            foreach ($rows as $row) {
                $resourceIds[] = $row['id'];
            }

        } while(sizeof($resourceIds) > 0);
    }
}