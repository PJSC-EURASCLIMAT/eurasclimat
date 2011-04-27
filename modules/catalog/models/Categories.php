<?php

class Catalog_Categories
{
	protected $_table;

    public function __construct()
    {
        $this->_table = new Catalog_Categories_Table();
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

    public function getListByParent($parent = 0)
    {
        $response = new OSDN_Response();
        $rowset = $this->_getChildNodes($parent);
        if (false === $rowset) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::DATABASE_ERROR));
        }

        // Form array for tree node
        $nodes = array();
        foreach ($rowset as $row) {
            $childrens = $this->_getChildNodes($row['id']);
            if (false === $childrens) {
                return $response->addStatus(new OSDN_Status(
                    OSDN_Status::DATABASE_ERROR));
            }
            $nodes[] = array(
                'id'        => $row['id'],
                'text'      => $row['name'],
                'leaf'      => !count($childrens)
            );
        }
        $response->setRowset($nodes);
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function add($name = '', $parent = 0)
    {
        $parent = intval($parent);
        $response = new OSDN_Response();
        $data = array('name' => $name);
        if ($parent) {
            $data['parent'] = $parent;
        }
        try {
            $id = $this->_table->insert($data);
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
        $data = array('name' => $name);
        try {
            $result = $this->_table->updateByPk($data, $id);
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

        // Check if node contain subnodes
        $rowset = $this->_getChildNodes($id);
        if (false === $rowset) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::DATABASE_ERROR));
        }
        if (count($rowset) > 0) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::DELETE_FAILED));
        }

        $result = $this->_table->deleteByPk($id);

        return $response->addStatus(new OSDN_Status(
            OSDN_Status::retrieveAffectedRowStatus($result)));
    }

    /* Private methods */

    private function _getChildNodes($parent = 0)
    {
        $parent = intval($parent);
        $where = $parent ? array('parent = ?' => $parent) : array('parent IS NULL');
        try {
            $rowset = $this->_table->fetchAll($where, 'name ASC')->toArray();
        } catch (Exception $e) {
            if (OSDN_DEBUG) {
                throw $e;
            }
            return false;
        }
        return $rowset;
    }
}