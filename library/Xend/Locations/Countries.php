<?php

class Xend_Locations_Countries
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Xend_Locations_CountriesTable();
    }

    public function getList()
    {
        $response = new Xend_Response();

        $select = $this->_table->select()
            ->from($this->_table->getTableName(), array('id', 'name'))
            ->order('name');

        try {
            $rows = $select->query()->fetchAll();
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

    public function getByCity($id)
    {
        $response = new Xend_Response();

        $id = intval($id);
        $response = new Xend_Response();

        $select = $this->_table->select()->from($this->_table->getTableName(), array('id', 'name'));

        if ($id != 0) {
            $select->where('country_id = ?', $id);
        }

        try {
            $rows = $select->query()->fetchAll();
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
}