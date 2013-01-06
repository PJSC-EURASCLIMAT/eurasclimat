<?php

class Catalog_Images
{
	protected $_table;

	protected $_entity;

    public function __construct($entity)
    {
        $this->_entity = $entity;
        $this->_table = new Catalog_ImagesTable();
    }

    public function getAll($entity, $entity_id)
    {
        $response = new Xend_Response();
        /*
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
        */
    }

    public function add($fileName, $entity_id)
    {
        $data = array(
            'name'      => $fileName,
            'entity'    => $this->_entity,
            'entity_id' => $entity_id,
        );

        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'name'      => array(array('StringLength', 0, 4096), 'allowEmpty' => false),
            'entity'    => array(array('StringLength', 0, 255), 'allowEmpty' => false),
            'entity_id' => array('Id', 'allowEmpty' => false)
        ), $data);

        $response = new Xend_Response();

        $response->addInputStatus($f);

        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $id = $this->_table->insert($data);
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
}