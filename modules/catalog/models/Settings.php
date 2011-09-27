<?php

class Catalog_Settings
{
	protected $_table;

    public function __construct($entity)
    {
        $this->_table = new Catalog_Settings_TableFactory($entity);
    }

    public function get($id)
    {
        $id = intval($id);
        $response = new OSDN_Response();
        try {
            $row = $this->_table->findOne($id);
        } catch (Exception $e) {
            if (OSDN_DEBUG) {
                throw $e;
            }
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::DATABASE_ERROR));
        }

        if ($row === false) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::DATABASE_ERROR));
        }

        $response->setRow(is_null($row) ? array() : $row->toArray());
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function getAll($params)
    {
        $response = new OSDN_Response();

        $select = $this->_table->getAdapter()->select()
            ->from($this->_table->getTableName());

        $plugin = new OSDN_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->totalCount = $plugin->getTotalCount();
            $status = OSDN_Status::OK;
        } catch (Exception $e) {
            if (OSDN_DEBUG) {
                throw $e;
            }
            $status = OSDN_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new OSDN_Status($status));
    }

    public function add($name = '')
    {
        $response = new OSDN_Response();

        try {
            $id = $this->_table->insert(array('name' => $name));
        } catch (Exception $e) {
            if (OSDN_DEBUG) {
                throw $e;
            }
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function update($name, $id)
    {
        $id = intval($id);
        $name = trim($name);

        $response = new OSDN_Response();

        $validator = new Zend_Validate_StringLength(1, 250);
        if ($id == 0 || !$validator->isValid($name)) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT));
        }

        try {
            $result = $this->_table->updateByPk(array('name' => $name), $id);
        } catch (Exception $e) {
            if (OSDN_DEBUG) {
                throw $e;
            }
        }

        return $response->addStatus(new OSDN_Status(
            OSDN_Status::retrieveAffectedRowStatus($result)));
    }

    public function delete($id)
    {
        $id = intval($id);

        $response = new OSDN_Response();

        if (!$id) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT));
        }

        $result = $this->_table->deleteByPk($id);

        return $response->addStatus(new OSDN_Status(
            OSDN_Status::retrieveAffectedRowStatus($result)));
    }
}