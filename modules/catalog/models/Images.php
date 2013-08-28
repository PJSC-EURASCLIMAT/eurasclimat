<?php

class Catalog_Images
{
	protected $_table;

	protected $_entity;

	public $IMAGE_PATH;

    public function __construct($entity)
    {
        $this->_entity = $entity;
        $this->_table = new Catalog_ImagesTable();
        $this->IMAGE_PATH = IMAGES_DIR . DIRECTORY_SEPARATOR
               . 'catalog' . DIRECTORY_SEPARATOR;
    }

    public function getAll($entity, $entity_id)
    {
        $response = new Xend_Response();

        $where = array('entity = (?)' => $entity, 'entity_id = (?)' => $entity_id);

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

        try {
            $row = $this->_table->findOne($id);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $fname = $this->IMAGE_PATH . $row['name'];

        if (file_exists($fname) && is_file($fname)) {
            if (!unlink($fname)) {
                return $response->addStatus(new Xend_Status(Xend_Status::DELETE_FAILED));
            }
        }

        $result = $this->_table->deleteByPk($id);

        return $response->addStatus(new Xend_Status(
            Xend_Status::retrieveAffectedRowStatus($result)));
    }

    public function deleteAllImages($entity_id)
    {
        $entity_id = intval($entity_id);

        $response = new Xend_Response();

        if (!$entity_id) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT));
        }

        $where = array('entity = (?)' => $this->_entity, 'entity_id = (?)' => $entity_id);

        try {
            $rows = $this->_table->fetchAll($where)->toArray();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        foreach ($rows as $r) {
            $resp = $this->delete($r['id']);
        }
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function get($id)
    {
        $id = intval($id);

        $response = new Xend_Response();

        if (!$id) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT));
        }

        try {
            $result = $this->_table->findOne($id);
            $response->setRow($result);
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