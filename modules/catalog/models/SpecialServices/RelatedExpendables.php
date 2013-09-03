<?php

class Catalog_SpecialServices_RelatedExpendables
{
	protected $_table;

	protected $_specialServicesTable;

    public function __construct($entity)
    {
        $this->_specialServicesTable = new Catalog_SpecialServices_Table();
        $this->_table = new Catalog_SpecialServices_RelatedExpendablesTable();
    }

    public function getAll($id)
    {
        $response = new Xend_Response();

        $id = intval($id);

        if (!$id) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(array('i' => $this->_table->getTableName()), array(
                    'id' => 'i.id', 's.name', 's.code', 's.measure',
                    's.price', 'i.expendable_id'
                ))
            ->join(array('s' => $this->_specialServicesTable->getTableName()), 's.id=i.service_id', array())
            ->where('i.service_id = (?)', $id);

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

    public function add($expendableId, $serviceId)
    {
        $data = array(
            'expendable_id' => $expendableId,
            'service_id'    => $serviceId
        );

        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'expendable_id' => array('Id', 'allowEmpty' => false),
            'service_id'    => array('Id', 'allowEmpty' => false)
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