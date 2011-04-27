<?php

class Catalog_Marks
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Catalog_Marks_Table();
    }

    public function getList($params)
    {
        $response = new OSDN_Response();

        $select = $this->_table->getAdapter()->select();
        $select->from($this->_table->getTableName());

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

    public function get($id)
    {
        $response = new OSDN_Response();

        $id = intval($id);
        if ($id == 0) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $row = $this->_table->findOne($id);
        if (!$row) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }

        $response->setRow($row->toArray());
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function add($name, $country)
    {
        $response = new OSDN_Response();

        $validator = new Zend_Validate_StringLength(1, 250);
        if (!$validator->isValid($name)) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'name'));
        }

        $validator = new Zend_Validate_StringLength(0, 250);
        if (!$validator->isValid($country)) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'country'));
        }

        $id = $this->_table->insert(array('name' => $name, 'country' => $country));
        if (!$id) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function update($id, $name, $country)
    {
        $response = new OSDN_Response();

        $id = intval($id);
        if ($id == 0) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $validator = new Zend_Validate_StringLength(1, 250);
        if (!$validator->isValid($name)) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'name'));
        }

        $validator = new Zend_Validate_StringLength(0, 250);
        if (!$validator->isValid($country)) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'country'));
        }

        $rows = $this->_table->updateByPk(array(
            'name' => $name,
            'country' => $country
        ), $id);

        return $response->addStatus(new OSDN_Status(
            OSDN_Status::retrieveAffectedRowStatus($rows)));
    }

    public function delete($id)
    {
        $id = intval($id);
        $response = new OSDN_Response();
        if ($id == 0) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $res = $this->_table->deleteByPk($id);
        if (!$res) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }
}