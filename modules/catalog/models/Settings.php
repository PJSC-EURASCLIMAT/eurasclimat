<?php

class Catalog_Settings
{
	protected $_table;

	protected $_marksResource;

    public function __construct($entity)
    {
        $this->_table = new Catalog_Settings_TableFactory($entity);
    }

    public function getAll()
    {
        $response = new Xend_Response();

        $tableName = $this->_table->getTableName();
        $tableInfo = explode('_', $tableName);

        $where = array();

        if ($tableInfo[0] == 'catalog' && $tableInfo[2] == 'marks') {

            $this->_marksResource =
            (string) Xend_Acl_Resource_Generator::getInstance()->catalog->$tableInfo[1]->marks;

            if ($this->_isMarksEnabled()) {
                $marks = $this->_getAllowedMarks();
                $where = array('id IN (?)' => $marks);
            }
        }

        try {
            $rows = $this->_table->fetchAll($where)->toArray();
            $response->setRowset($rows);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status($status));
    }

    public function add($name = '')
    {
        $response = new Xend_Response();

        try {
            $id = $this->_table->insert(array('name' => $name));
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(
                Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function update($name, $id)
    {
        $id = intval($id);
        $name = trim($name);

        $response = new Xend_Response();

        $validator = new Zend_Validate_StringLength(1, 250);
        if ($id == 0 || !$validator->isValid($name)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT));
        }

        try {
            $result = $this->_table->updateByPk(array('name' => $name), $id);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
        }

        return $response->addStatus(new Xend_Status(
            Xend_Status::retrieveAffectedRowStatus($result)));
    }

    public function delete($id)
    {
        $id = intval($id);

        $response = new Xend_Response();

        if (!$id) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT));
        }

        $result = $this->_table->deleteByPk($id);

        return $response->addStatus(new Xend_Status(
            Xend_Status::retrieveAffectedRowStatus($result)));
    }


    /*
     *  Private functions
     */

    private function _isMarksEnabled()
    {
        $acl = Xend_Accounts_Prototype::getAcl();
        return $acl->isAllowed($this->_marksResource, Xend_Acl_Privilege::VIEW);
    }

    /**
     * Marks wich allowed for current user
     *
     * @return array()
     */
    private function _getAllowedMarks()
    {
        $resourcesModel = new Xend_Acl_Resource();
        $acl = Xend_Accounts_Prototype::getAcl();

        $resources = $resourcesModel->fetchByParentId($this->_marksResource);

        $marks = array();
        foreach($resources->rows as $res) {
            if ($acl->isAllowed($res['id'], Xend_Acl_Privilege::VIEW)) {
                $marks[] = intval($res['name']);
            }
        }

        return $marks;
   }
}