<?php

class Xend_Acl_Roles
{
    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_tableRoles;

    public function __construct()
    {
        $this->_tableRoles = new Xend_Acl_Table_Roles();
    }

    /**
     * Fetch all roles tree
     *
     * @return Xend_Response <code>
     *  rows: array(
     *      id: int
     *      name: string
     *      parent_id: int
     *  );
     * </code>
     */
    public function fetchRolesTree()
    {
        $response = new Xend_Response();
        $rowset = $this->_getChildren(0);
        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
    }

    /**
     * Fetch all roles
     *
     * @return Xend_Response <code>
     *  rows: array(
     *      id: int
     *      name: string
     *  );
     * </code>
     */
    public function fetchRoles()
    {
        $response = new Xend_Response();
        $rowset = $this->_tableRoles->fetchAll()->toArray();
        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
    }

    /**
     * Retrieve the role by id
     *
     * @param int $id
     * @return Xend_Response
     */
    public function fetchRole($id)
    {
        $response = new Xend_Response();

        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'id'));
            return $response;
        }

        $row = $this->_tableRoles->findOne($id);
        if (!empty($row)) {
            $row = $row->toArray();
        }

        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
        $response->setRow($row);
        return $response;
    }

    /**
     * Rename role
     *
     * @param int $id       The role id
     * @param string $name  New role name
     * @return Xend_Response
     */
    public function rename($id, $name)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'id'));
            return $response;
        }

        $affectedRows = $this->_tableRoles->updateByPk(array(
            'name'  => $name
        ), $id);
        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::retrieveAffectedRowStatus($affectedRows)));
        return $response;
    }

    /**
     * Create new role
     *
     * @param string $name      The role name
     * @return Xend_Response <code>
     *  id: int
     * </code>
     */
    public function createRole($name)
    {
        $response = new Xend_Response();
        $id = $this->_tableRoles->insert(array(
            'name'  => $name
        ));
        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
        $response->id = $id;
        return $response;
    }

    /**
     * Delete role
     *
     * @param int $id       The role id
     * @return Xend_Response
     */
    public function delete($id)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'id'));
            return $response;
        }
        $affectedRows = $this->_tableRoles->deleteByPk($id);
        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::retrieveAffectedRowStatus($affectedRows)));
        return $response;
    }

    /**
     * Update role by id
     *
     * @param int $id
     * @param array $data
     *
     * @return Xend_Response
     */
    public function update($data)
    {
        $response = new Xend_Response();
        $f = new Xend_Filter_Input(array(
            '*' => 'StringTrim'
        ), array(
            'name'      => array('presence' => 'required'),
            'id'        => array('id', 'presence' => 'required'),
            'parent_id' => array('presence' => 'required', 'allowEmpty' => true)
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $data['id'];

        $parent = intval($f->parent_id);
        if ($parent > 0) {
            $changes['parent_id'] = $parent;
        }
        $changes['name'] = $f->name;

        $affectedRows = $this->_tableRoles->updateByPk($data, $id);
        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::retrieveAffectedRowStatus($affectedRows)));
        return $response;
    }

    /**
     * Fetch childrens of tree node
     *
     * @return Xend_Response <code>
     *  rows: array(
     *      id: int
     *      name: string
     *      parent_id: int
     *  );
     * </code>
     */
    private function _getChildren($id)
    {
        $where = $id > 0 ? array('parent_id = ?' => $id) : array('parent_id is NULL');
        $rowset = $this->_tableRoles->fetchAll($where)->toArray();
        foreach ($rowset as &$row) {
            $row['children'] = $this->_getChildren($row['id']);
        }
        return $rowset;
    }
}