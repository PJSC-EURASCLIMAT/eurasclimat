<?php

class Crm_Projects_Configurator_Model
{
    protected $_table,
        $_equipmentTable,
        $_servicesTable,
        $_specialServicesTable,
        $_expendablesTable;

    public function __construct()
    {
        $this->_table = new Crm_Projects_Table();
        $this->_equipmentTable = new Crm_Projects_Configurator_EquipmentTable();
        $this->_servicesTable = new Crm_Projects_Configurator_ServicesTable();
        $this->_specialServicesTable = new Crm_Projects_Configurator_SpecialServicesTable();
        $this->_expendablesTable = new Crm_Projects_Configurator_ExpendablesTable();
    }

    public function getEquipmentList($id)
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
            ->joinLeft(array('m' => $marksTable->getTableName()),
                'm.id=c.mark_id', array())
            ->where('c.id = ?', $entity_id);

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
            $data['summ'] = $row['number'] * $data['price'];
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

        // Automatically add related services for given equipment
        // $this->_addRelatedServices($f->project_id, $f->entity, $f->entity_id);

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
            'service_id'    => 's.service_id',
            'summ'          => new Zend_Db_Expr('number * price')
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

    public function getSpecialServices($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $catalogSpecialServicesTable = new Catalog_SpecialServices_Table();

        $select = $this->_specialServicesTable->getAdapter()->select()
        ->from(array('s' => $this->_specialServicesTable->getTableName()), array(
            'id'            => 's.id',
            'code'          => 'cs.code',
            'name'          => 'cs.name',
            'price'         => 'cs.price',
            'measure'       => 'cs.measure',
            'term'          => 'cs.term',
            'number'        => 's.number',
            'service_id'    => 's.service_id',
            'summ'          => new Zend_Db_Expr('number * price')
        ))
        ->join(array('cs' => $catalogSpecialServicesTable->getTableName()),
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


    public function addSpecialService(array $params)
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

        $id = $this->_specialServicesTable->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        // Automatically add related expendables for given special service
        $this->_addRelatedExpendables($f->project_id, $f->service_id);

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function updateSpecialService(array $params)
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

        $rows = $this->_specialServicesTable->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function deleteSpecialService($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $res = $this->_specialServicesTable->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function getExpendables($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $catalogExpendablesTable = new Catalog_Expendables_Table();

        $select = $this->_expendablesTable->getAdapter()->select()
        ->from(array('e' => $this->_expendablesTable->getTableName()), array(
            'id'            => 'e.id',
            'code'          => 'ce.code',
            'name'          => 'ce.name',
            'price'         => 'ce.price',
            'measure'       => 'ce.measure',
            'number'        => 'e.number',
            'expendable_id' => 'e.expendable_id',
            'summ'          => new Zend_Db_Expr('number * price')
        ))
        ->join(array('ce' => $catalogExpendablesTable->getTableName()),
            'ce.id=e.expendable_id', array())
        ->where('e.project_id = (?)', $id);

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

    public function addExpendable(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'project_id'    => array('Id', 'presence' => 'required'),
            'expendable_id' => array('Id', 'presence' => 'required'),
            'number'        => array('Id', 'presence' => 'required')
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $this->_expendablesTable->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function updateExpendable(array $params)
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

        $rows = $this->_expendablesTable->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function deleteExpendable($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $res = $this->_expendablesTable->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }


    // Private section

    /**
     * @param $project_id: project ID
     * @param $entity: catalog
     * @param $entity_id: equipment ID
     * @return bool: true = success, false = failure
     */
    private function _addRelatedServices($project_id, $entity, $entity_id)
    {
        $project_id = intval($project_id);
        $entity_id = intval($entity_id);
        if (0 == $project_id || 0 == $entity_id) {
            return false;
        }

        $relatedServices = new Catalog_RelatedServices($entity);

        $response = $relatedServices->getAll($entity_id);
        if ($response->hasNotSuccess()) {
            return false;
        }

        $rows = $response->getRowset();

        print_r($rows);

        foreach ($rows as $row) {
            $response = $this->addService(array(
                'project_id'    => $project_id,
                'service_id'    => $row['service_id'],
                'number'        => 1
            ));
        }

        return true;
    }

    /**
     * @param $project_id: project ID
     * @param $service_id: special service ID
     * @return bool: true = success, false = failure
     */
    private function _addRelatedExpendables($project_id, $service_id)
    {
        $project_id = intval($project_id);
        $service_id = intval($service_id);
        if (0 == $project_id || 0 == $service_id) {
            return false;
        }

        $relatedExpendables = new Catalog_SpecialServices_RelatedExpendables();

        $response = $relatedExpendables->getList($service_id);
        if ($response->hasNotSuccess()) {
            return false;
        }

        $rows = $response->getRowset();

        print_r($rows);

        foreach ($rows as $row) {
            $response = $this->addExpendable(array(
                'project_id'    => $project_id,
                'expendable_id' => $row['expendable_id'],
                'number'        => 1
            ));
        }

        return true;
    }
}