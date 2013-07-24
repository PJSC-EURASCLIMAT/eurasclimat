<?php

class Catalog_Projects_Model
{
    protected $_table, $_equipmentTable, $_servicesTable;

    public function __construct()
    {
        $this->_table = new Catalog_Projects_Table();
        $this->_equipmentTable = new Catalog_Projects_EquipmentTable();
        $this->_servicesTable = new Catalog_Projects_ServicesTable();
    }

    public function getList($params)
    {
        $response = new Xend_Response();

        $accountsTable = new Xend_Accounts_Table_Accounts();

        $select = $this->_table->getAdapter()->select()
            ->from(array('p' => $this->_table->getTableName()), array(
                'id'            => 'p.id',
                'name'          => 'p.name',
                'created_date'  => 'p.created_date',
                'creator_id'    => 'p.creator_id',
                'creator_name'  => 'a.name'
            ))
            ->join(array('a' => $accountsTable->getTableName()),
                'a.id=p.creator_id', array());

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->totalCount = $plugin->getTotalCount();
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new Xend_Status($status));
    }

    public function get($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $row = $this->_table->findOne($id);
        if (!$row) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }
        $response->setRow($row->toArray());
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function add(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'name'          => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = array (
            'name'          => $f->getEscaped('name'),
            'creator_id'    => Xend_Accounts_Prototype::getId()
        );

        $id = $this->_table->insert($data);
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function update(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'id'            => array('Id', 'presence' => 'required'),
            'name'          => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = array ('name' => $f->getEscaped('name'));

        $rows = $this->_table->updateByPk($data, $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function delete($id)
    {
        $id = intval($id);
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

    public function getEquipment($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        try {
            $rows = $this->_equipmentTable->fetchAll(array('project_id = (?)' => $id))->toArray();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $marksTable = new Catalog_Settings_TableFactory('marks');

        foreach ($rows as &$row) {

            $entity_id = intval($row['entity_id']);
            if ($entity_id == 0) {
                return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'entity_id'));
            }

            $tableName = 'Catalog_' . ucfirst($row['entity']) . '_Table';
            try {
                $table = new $tableName;
            } catch (Exception $e) {
                if (DEBUG) {
                    throw $e;
                }
                return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
            }

            if (!($table instanceof Xend_Db_Table_Abstract)) {
                return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
            }

            $select = $this->_table->getAdapter()->select()
            ->from(array('c' => $table->getTableName()), array(
                'code'      => 'c.code',
                'marking'   => 'c.marking',
                'price'     => 'c.price',
                'mark'      => 'm.name'
            ))
            ->join(array('m' => $marksTable->getTableName()),
                'm.id=c.mark_id', array());

            try {
                $data = $select->query()->fetch();
            } catch (Exception $e) {
                if (DEBUG) {
                    throw $e;
                }
                return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
            }

            if (empty($data)) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }
            $row = array_merge($row, $data);
        }

        $response->setRowset($rows);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function addEquipment(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'project_id'    => array('Id', 'presence' => 'required'),
            'entity'        => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'entity_id'     => array('Id', 'presence' => 'required'),
            'number'        => array('Id', 'presence' => 'required')
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $this->_equipmentTable->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        /**
         * TODO: Automatically add services for given equipment
         */

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function updateEquipment(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'        => array('Id', 'presence' => 'required'),
            'number'    => array('Id', 'presence' => 'required')
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_equipmentTable->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function deleteEquipment($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $res = $this->_equipmentTable->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function getServices($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $catalogServicesTable = new Catalog_Services_Table();

        $select = $this->_servicesTable->getAdapter()->select()
        ->from(array('s' => $this->_servicesTable->getTableName()), array(
            'id'            => 's.id',
            'code'          => 'cs.code',
            'name'          => 'cs.name',
            'price'         => 'cs.price',
            'measure'       => 'cs.measure',
            'term'          => 'cs.term',
            'number'        => 's.number',
            'service_id'    => 's.service_id'
        ))
        ->join(array('cs' => $catalogServicesTable->getTableName()),
            'cs.id=s.service_id', array())
        ->where('s.project_id = (?)', $id);

        try {
            $rows = $select->query()->fetchAll();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->setRowset($rows);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function addService(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'project_id'    => array('Id', 'presence' => 'required'),
            'service_id'    => array('Id', 'presence' => 'required'),
            'number'        => array('Id', 'presence' => 'required')
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $this->_servicesTable->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function updateService(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'        => array('Id', 'presence' => 'required'),
            'number'    => array('Id', 'presence' => 'required')
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_servicesTable->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function deleteService($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $res = $this->_servicesTable->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}