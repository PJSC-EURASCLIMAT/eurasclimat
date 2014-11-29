<?php

class Catalog_RelatedServices_Model
{
	protected $_table;

	protected $_servicesTable;

	protected $_entity;

    public function __construct($entity)
    {
        $this->_entity = $entity;
        $this->_table = new Catalog_RelatedServices_Table();
        $this->_servicesTable = new Catalog_Services_Table();
    }

    public function getAll($id)
    {
        $response = new Xend_Response();

        $id = intval($id);

        if(!$id) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(array('i' => $this->_table->getTableName()), array(
                    'id' => 'i.id', 's.name', 'i.service_id', 'i.term', 'i.price'
                ))
            ->join(array('s' => $this->_servicesTable->getTableName()),
                   's.id=i.service_id', array()
                )
            ->where('i.entity_id = (?)', $id)
            ->where('i.entity = (?)', $this->_entity);

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

    public function add($params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'entity_id'     => array('Id', 'allowEmpty' => false),
            'service_id'    => array('Id', 'allowEmpty' => false),
            'term'          => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'price'         => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);

        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = $f->getData();
        $data['entity'] = $this->_entity;
        
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

    public function update($params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'id'            => array('Id', 'allowEmpty' => false),
            'service_id'    => array('Id', 'allowEmpty' => false),
            'term'          => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'price'         => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);

        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $id = $this->_table->updateByPk($f->getData(), $f->id);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(
                Xend_Status::DATABASE_ERROR));
        }

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