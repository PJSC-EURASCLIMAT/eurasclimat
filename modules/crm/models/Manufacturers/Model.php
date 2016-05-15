<?php

class Crm_Manufacturers_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Manufacturers_Table();
    }

    public function read()
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('c' => $this->_table->getTableName())
            );

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

    public function create(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'type'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'url'       => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $data);

        $response->addInputStatus($f);

        if ( $response->hasNotSuccess() ) {
            return $response;
        }

        try {
            $data = $f->getData();
            $data['id'] = $this->_table->insert($data);
            $response->setRow($data);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status($status));
    }

    public function update(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'        => array('Id', 'allowEmpty' => false),
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'type'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'url'       => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $data);

        $response->addInputStatus($f);

        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function destroy(array $data)
    {
        $id = intval($data['id']);

        $response = new Xend_Response();

        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $res = $this->_table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}