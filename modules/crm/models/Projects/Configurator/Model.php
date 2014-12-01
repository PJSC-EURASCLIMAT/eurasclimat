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

            $tableName = 'Catalog_' . Xend_Common::convertEntity($row['entity']) . '_Table';
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
            $eq_summ = $row['number'] * floatval($row['price']);
            $data['eq_summ'] = $eq_summ;
            $row = array_merge($row, $data);

            $services = $this->_getAttachedServices($row['id']);
            $row['services'] = $services;

            $servicesSumm = 0;
            foreach ($services as $s) {
                $servicesSumm += floatval($s['price']);
            }
            $row['services_summ'] = $servicesSumm;
            $row['total_summ'] = $eq_summ + $servicesSumm;
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
            'entity'        => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => false,
                                'presence' => 'required'
                            ),
            'entity_id'     => array('Id', 'presence' => 'required'),
            'number'        => array('Id', 'presence' => 'required')
        ), $params);

        $response = new Xend_Response();
        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $tableName = 'Catalog_' . Xend_Common::convertEntity($f->entity) . '_Table';
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

        $catalogItem = $table->findOne($f->entity_id);
        if (!$catalogItem) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $data = $f->getData();
        // TODO: valutes !!!
        $data['price'] = $catalogItem->price;

        $id = $this->_equipmentTable->insert($data);
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        // Automatically add related services for given equipment
        // $this->_addRelatedServices($f->project_id, $f->entity, $f->entity_id);

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function getEquipment($equipment_id) {

        $id = intval($equipment_id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $equipmentRecord = $this->_equipmentTable->findOne($id);
        if (!$equipmentRecord || $equipmentRecord == null) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $response->setRow($equipmentRecord->toArray());
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function updateEquipment(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'        => array('Id', 'presence' => 'required'),
            'number'    => array('Id', 'presence' => 'required'),
            'price'     => array(
                            array('StringLength', 1, 255),
                            'allowEmpty' => false,
                            'presence' => 'required'
                        )
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

        $equipmentRecord = $this->_equipmentTable->findOne($id);
        if (!$equipmentRecord || $equipmentRecord == null) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $relatedServices = $this->_getRelatedServices(
                            $equipmentRecord->entity,
                            $equipmentRecord->entity_id
                           );

        $attachedServices = $this->_getAttachedServices($id);

        foreach ($attachedServices as $as) {
            foreach ($relatedServices as $i => $rs) {
                if ($as['service_id'] == $rs['service_id']) {
                    unset($relatedServices[$i]);
                    break;
                }
            }
        }

        foreach ($relatedServices as $rs) {
            $attachedServices[] = array(
                'id'            => null,
                'service_id'    => $rs['service_id'],
                'name'          => $rs['name'],
                'term'          => $rs['term'],
                'price'         => $rs['price']
            );
        }

        $response->setRowset($attachedServices);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function addService(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'eq_id'         => array('Id', 'presence' => 'required'),
            'service_id'    => array('Id', 'presence' => 'required'),
            'term'          => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => false,
                                'presence' => 'required'
                            ),
            'price'         => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => false,
                                'presence' => 'required'
                            )
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
            'id'            => array('Id', 'presence' => 'required'),
            'term'          => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => false,
                                'presence' => 'required'
                            ),
            'price'         => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => false,
                                'presence' => 'required'
                            )
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
            'price'         => 's.price',
            'measure'       => 'cs.measure',
            'term'          => 's.term',
            'number'        => 's.number',
            'service_id'    => 's.service_id',
            'summ'          => new Zend_Db_Expr('s.number * s.price')
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

        foreach ($rows as &$row) {

            $expendables = $this->_getAttachedExpendables($row['id']);
            $row['expendables'] = $expendables;

            $expendablesSumm = 0;
            foreach ($expendables as $e) {
                $expendablesSumm += floatval($e['summ']);
            }

            $row['expendables_summ'] = $expendablesSumm;
            $row['total_summ'] = $expendablesSumm + floatval($row['summ']);
        }

        $response->setRowset($rows);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function getSpecialService($id)
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
            'price'         => 's.price',
            'measure'       => 'cs.measure',
            'term'          => 's.term',
            'number'        => 's.number',
            'service_id'    => 's.service_id',
            'summ'          => new Zend_Db_Expr('s.number * s.price')
        ))
        ->join(array('cs' => $catalogSpecialServicesTable->getTableName()),
            'cs.id=s.service_id', array())
        ->where('s.id = (?)', $id)
        ->limit(1);

        try {
            $row = $select->query()->fetchAll();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->setRow($row[0]);
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
        $data = $f->getData();

        $specialServices = new Catalog_SpecialServices_Model();

        $spSV = $specialServices->get($f->service_id);
        if ($spSV->hasNotSuccess()) {
            return $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT));
        }
        $spSV = $spSV->getRow();

        $data['term'] = $spSV['term'];
        $data['price'] = $spSV['price'];

        $id = $this->_specialServicesTable->insert($data);
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function updateSpecialService(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'            => array('Id', 'presence' => 'required'),
            'number'        => array('Id', 'presence' => 'required'),
            'term'          => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => true
                            ),
            'price'         => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => true
                            )
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

        $specialServiceRecord = $this->_specialServicesTable->findOne($id);
        if (!$specialServiceRecord || $specialServiceRecord == null) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $relatedExpendables = $this->_getRelatedExpendables($specialServiceRecord->service_id);
        $attachedExpendables = $this->_getAttachedExpendables($id);

        foreach ($attachedExpendables as $ae) {
            foreach ($relatedExpendables as $i => $re) {
                if ($ae['expendable_id'] == $re['expendable_id']) {
                    unset($relatedExpendables[$i]);
                    break;
                }
            }
        }

        foreach ($relatedExpendables as $re) {
            $attachedExpendables[] = array(
                'id'            => null,
                'ss_id'         => $re['service_id'],
                'expendable_id' => $re['expendable_id'],
                'name'          => $re['name'],
                'measure'       => $re['measure'],
                'number'        => $re['number'],
                'price'         => $re['price']
            );
        }

        $response->setRowset($attachedExpendables);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function addExpendable(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'ss_id'         => array('Id', 'presence' => 'required'),
            'expendable_id' => array('Id', 'presence' => 'required'),
            'measure'       => array(
                                array('StringLength', 0, 255),
                                'allowEmpty' => true
                            ),
            'number'        => array(
                                array('StringLength', 0, 255),
                                'allowEmpty' => true
                            ),
            'price'         => array(
                                array('StringLength', 0, 255),
                                'allowEmpty' => true
                            )
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
            'id'            => array('Id', 'presence' => 'required'),
            'number'        => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => true
                            ),
            'price'         => array(
                                array('StringLength', 1, 255),
                                'allowEmpty' => true
                            )
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

    private function _getRelatedServices($entity, $entity_id) {

        $entity_id = intval($entity_id);
        if (0 == $entity_id) {
            return false;
        }

        $relatedServices = new Catalog_RelatedServices_Model($entity);

        $response = $relatedServices->getAll($entity_id);
        if ($response->hasNotSuccess()) {
            return false;
        }

        return $response->getRowset();
    }

    private function _getAttachedServices($id) {

        $id = intval($id);
        if (0 == $id) {
            return false;
        }

        $catalogServicesTable = new Catalog_Services_Table();

        $select = $this->_servicesTable->getAdapter()->select()
        ->from(array('s' => $this->_servicesTable->getTableName()), array(
            'id'            => 's.id',
            'name'          => 'cs.name',
            'term'          => 's.term',
            'price'         => 's.price',
            'service_id'    => 's.service_id'
        ))
        ->join(array('cs' => $catalogServicesTable->getTableName()),
            'cs.id=s.service_id', array())
        ->where('s.eq_id = (?)', $id);

        try {
            $rows = $select->query()->fetchAll();
            return $rows;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return false;
        }
    }

    private function _getRelatedExpendables($id) {

        $id = intval($id);
        if (0 == $id) {
            return false;
        }

        $relatedExpendables = new Catalog_SpecialServices_RelatedExpendables();

        $response = $relatedExpendables->getList($id);
        if ($response->hasNotSuccess()) {
            return false;
        }

        return $response->getRowset();
    }

    private function _getAttachedExpendables($id) {

        $id = intval($id);
        if (0 == $id) {
            return false;
        }

        $catalogExpendablesTable = new Catalog_Expendables_Table();

        $select = $this->_expendablesTable->getAdapter()->select()
        ->from(array('e' => $this->_expendablesTable->getTableName()), array(
            'id'            => 'e.id',
            'name'          => 'ce.name',
            'expendable_id' => 'e.expendable_id',
            'measure'       => 'e.measure',
            'number'        => 'e.number',
            'price'         => 'e.price',
            'ss_id'         => 'e.ss_id',
            'summ'          => new Zend_Db_Expr('e.number * e.price')
        ))
        ->join(array('ce' => $catalogExpendablesTable->getTableName()),
            'ce.id=e.expendable_id', array())
        ->where('e.ss_id = (?)', $id);

        try {
            $rows = $select->query()->fetchAll();
            return $rows;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return false;
        }
    }
}