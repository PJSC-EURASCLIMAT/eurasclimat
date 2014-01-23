<?php

class Catalog_SpecialServices_RelatedExpendables
{
	protected $_table;

	protected $_specialServicesTable;

    public function __construct()
    {
        $this->_expendablesTable = new Catalog_Expendables_Table();
        $this->_table = new Catalog_SpecialServices_RelatedExpendablesTable();
    }

    public function getList($id)
    {
        $response = new Xend_Response();

        $id = intval($id);

        if (!$id) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(array('i' => $this->_table->getTableName()), array(
                    'id' => 'i.id', 'e.name', 'e.code', 'e.measure',
                    'i.price', 'i.number', 'i.expendable_id', 'i.service_id'
                ))
            ->join(array('e' => $this->_expendablesTable->getTableName()),
                    'e.id=i.expendable_id', array()
                )
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

    public function add($data)
    {
        $f = new Xend_Filter_Input(array(
            'expendable_id' => 'Int',
            'service_id'    => 'Int'
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

    public function update($data)
    {
        $f = new Xend_Filter_Input(array(
            'id' => 'Int',
        ), array(
            'number' => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'price'  => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ), $data);

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