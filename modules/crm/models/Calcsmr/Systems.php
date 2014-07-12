<?php

class Crm_Calcsmr_Systems
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Calcsmr_SystemsTable();
    }

    public function getList($system_id)
    {
        $system_id = intval($system_id);

        $response = new Xend_Response();

        if ($system_id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'system_id'));
        }

        $select = $this->_table->getAdapter()->select()
            ->from($this->_table->getTableName())
            ->columns(array('sum' => new Zend_Db_Expr('qty * price')))
            ->where('system_id = (?)', $system_id);

        try {
            $rows = $select->query()->fetchAll();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(Xend_Status::DATABASE_ERROR);
        }

        $response->setRowset($rows);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function add(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'                 => 'StringTrim'
        ), array(
            'system_id' => array(array('Id'), 'allowEmpty' => false),
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'measure'   => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'qty'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'price'     => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $this->_table->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function update($data)
    {
        $f = new Xend_Filter_Input(array(
            '*'                 => 'StringTrim'
        ), array(
            'id'        => array(array('Id'), 'allowEmpty' => false),
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'measure'   => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'qty'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'price'     => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $data);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = $f->getData();
        unset($data['system_id']);

        $id = $this->_table->updateByPk($data, $f->id);
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function delete($data)
    {
        $response = new Xend_Response();

        $data = Zend_Json::decode($data);

        $id = intval($data['id']);

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