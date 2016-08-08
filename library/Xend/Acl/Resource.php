<?php

/**
 * Xend_Acl_Resource
 */
class Xend_Acl_Resource
{
    /**
     * The table resource
     *
     * @var Xend_Acl_Table_Resource
     */
    protected $_tableResource;

    /**
     * The constructor
     *
     */
    public function __construct()
    {
        $this->_tableResource = new Xend_Acl_Table_Resource();
    }

    /**
     * Fetch resource by parent id
     *
     * @param int $parentId
     * @return Xend_Response
     */
    public function fetchByParentId($parentId)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id(true);
        if (!$validate->isValid($parentId)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'parent_id'));
            return $response;
        }

        if ($parentId) {
            $clause = array('parent_id = ?' => $parentId);
        } else {
            $clause = array(new Zend_Db_Expr('parent_id IS NULL'));
        }

        try {
            $rowset = $this->_tableResource->fetchAll($clause);
            $response->rows = $rowset->toArray();
            $status = Xend_Acl_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }

            $status = Xend_Acl_Status::DATABASE_ERROR;
        }
        $response->addStatus(new Xend_Acl_Status($status));
        return $response;
    }

    /**
     * Fetch count of resources by parent id
     *
     * @param int $parentId     The parent id
     * @return Xend_Response
     * <data>
     * array(
     *      count: int
     * )
     * </data>
     */
    public function fetchCountByParentId($parentId)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id(true);
        if (!$validate->isValid($parentId)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'parent_id'));
            return $response;
        }

        if ($parentId) {
            $clause = array('parent_id = ?' => $parentId);
        } else {
            $clause = array(new Zend_Db_Expr('parent_id IS NULL'));
        }

        $count = $this->_tableResource->count($clause);
        $response->count = $count;
        if (false === $count) {
            $status = Xend_Acl_Status::DATABASE_ERROR;
        } else {
            $status = Xend_Acl_Status::OK;
        }

        $response->addStatus(new Xend_Acl_Status($status));
        return $response;
    }

    /**
     * Delete resource by id
     *
     * @param int $resourceId       The resource id
     * @return Xend_Response
     */
    public function deleteResource($resourceId)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($resourceId)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'resource_id'));
            return $response;
        }

        $affectedRows = $this->_tableResource->deleteByPk($resourceId);
        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::retrieveAffectedRowStatus($affectedRows)));
        $response->affectedRows = $affectedRows;
        return $response;
    }

    /**
     * Fetch all resources
     *
     * @return Xend_Response
     */
    public function fetchAll()
    {
        $response = new Xend_Response();
        $rowset = $this->_tableResource->fetchAll();
        if (!is_null($rowset)) {
            $rowset = $rowset->toArray();
        } else {
            $rowset = array();
        }

        $response->rows = $rowset;
        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
        return $response;
    }

    /**
     * Fetch resources recursive
     *
     * @param int $id
     * @return Xend_Response
     * <code>
     *  array(
     *      rowset: array()
     *  )
     * </code>
     */
    public function fetchResourcesRecursive($id)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'resource_id'));
            return $response;
        }

        $response->rowset = $this->_fetchRecursive($id);
        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
        return $response;
    }

    /**
     * Fetch resources names recursive
     *
     * @param int $id
     * @return Xend_Response
     */
    public function fetchResourceNamesRecursive($id)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'resource_id'));
            return $response;
        }

        $collection = array();
        foreach($this->_fetchRecursive($id) as $row) {
            $collection[] = $row['name'];
        }

        $response->rowset = $collection;
        $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
        return $response;
    }

    /**
     * Fetch resources recursive
     *
     * @param int $id
     * @return array
     */
    protected function _fetchRecursive($id)
    {
        $collection = array();

        do {
            $resource = $this->_tableResource->findOne($id);
            $id = false;
            if (!empty($resource)) {
                $id = (int) $resource->parent_id;
                $collection[] = $resource->toArray();
            }

        } while ($id > 0);

        return array_reverse($collection);
    }
}