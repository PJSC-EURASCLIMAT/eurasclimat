<?php

class Crm_Calcpd_ConfigModel
{

    public function getObjTree()
    {
        $response = new Xend_Response();
        $objTypeTable = new Xend_Db_Table_Factory('calcpd_obj_type');
        $objClassTable = new Xend_Db_Table_Factory('calcpd_obj_class');

        try {
            $rowsType = $objTypeTable->fetchAll();
            $rowsClass = $objClassTable->fetchAll();
            if (!$rowsType || !$rowsClass) {
                $status = Xend_Accounts_Status::DATABASE_ERROR;
                return $response->addStatus(new Xend_Accounts_Status($status));
            }
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        $typeList = $rowsType->toArray();
        $classList = $rowsClass->toArray();
        $data = array();

        foreach ($typeList as $t) {
            $tmp = array();
            foreach ($classList as $c) {
                $tmp[] = array(
                    'expanded'      => true,
                    'leaf'          => true,
                    'text'          => $c['name'],
                    'obj_type_id'   => $t['id'],
                    'obj_class_id'  => $c['id']
                );
            }
            $data[] =  array(
                'expanded'      => true,
                'leaf'          => false,
                'text'          => $t['name'],
                'obj_type_id'   => 0,
                'obj_class_id'  => 0,
                'children'      => $tmp
            );
        }

        $response->setRowset($data);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function getPrice($obj_type_id, $obj_class_id)
    {
        $response = new Xend_Response();

        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($obj_type_id)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'obj_type_id'));
        }

        if (!$validate->isValid($obj_class_id)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'obj_class_id'));
        }

        $servTable = new Xend_Db_Table_Factory('calcpd_serv');
        $priceTable = new Xend_Db_Table_Factory('calcpd_price');

        $select = $servTable->getAdapter()->select()
            ->from(array('s' => $servTable->getTableName()),
                array('s.id', 's.name'))
            ->joinLeft(array('p' => $priceTable->getTableName()),
                new Zend_Db_Expr(sprintf(
                    's.id=p.serv_id AND p.obj_type_id = %d AND p.obj_class_id = %d',
                    $obj_type_id, $obj_class_id
                )), array('p.price')
            );

        try {
            $rows['serv'] = $select->query()->fetchAll();
            $rows['obj_type_id'] = $obj_type_id;
            $rows['obj_class_id'] = $obj_class_id;
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

    public function setPrice($data)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        $priceTable = new Xend_Db_Table_Factory('calcpd_price');

        if (!$validate->isValid($data['obj_type_id'])) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'obj_type_id'));
        }

        if (!$validate->isValid($data['obj_class_id'])) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'obj_class_id'));
        }

        $serv = $data['serv'];
        if (!is_array($serv)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'serv'));
        }

        foreach ($serv as $id => $v) {

            if (!$validate->isValid($id) || !is_double(floatval($v))) {
                return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'serv[' . $id . ']'));
            }

            $select = $priceTable->getAdapter()->select()
                ->from($priceTable->getTableName())
                ->where('obj_type_id = ?', $data['obj_type_id'])
                ->where('obj_class_id = ?', $data['obj_class_id'])
                ->where('serv_id = ?', $id);

            try {
                $rows = $select->query()->fetchAll();

                if (!empty($rows)) {
                    $priceTable->updateByPk(array('price' => $v), $rows[0]['id']);
                } else {
                    $priceTable->insert(array(
                        'obj_type_id'   => $data['obj_type_id'],
                        'obj_class_id'  => $data['obj_class_id'],
                        'serv_id'       => $id,
                        'price'         => $v
                    ));
                }

            } catch (Exception $e) {
                if (DEBUG) {
                    throw $e;
                }
                return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
            }
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    /* serv, obj type & obj class lists */

    public function create($tableName, $data)
    {
        $data = Zend_Json::decode($data);

        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'name'  => 'StringTrim'
        ), array(
            'name'  => array('StringLength')
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $table = new Xend_Db_Table_Factory($tableName);
            $response->id = $table->insert(array('name' => $f->name));
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function read($tableName)
    {
        $response = new Xend_Response();

        try {
            $table = new Xend_Db_Table_Factory($tableName);
            $status = Xend_Accounts_Status::OK;
            $rows = $table->fetchAll();
            if ($rows) {
                $response->setRowset($rows->toArray());
            }
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function update($tableName, $data)
    {
        $data = Zend_Json::decode($data);

        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'id'    => 'int',
            'name'  => 'StringTrim'
        ), array(
            'id'    => array('id', 'presence' => 'required'),
            'name'  => array('StringLength')
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $table = new Xend_Db_Table_Factory($tableName);
            $table->updateByPk(array('name' => $f->name), $f->id);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function destroy($tableName, $data)
    {
        $data = Zend_Json::decode($data);

        $response = new Xend_Response();

        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($data['id'])) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        try {
            $table = new Xend_Db_Table_Factory($tableName);
            $result = $table->deleteByPk($data['id']);
            $status = Xend_Accounts_Status::retrieveAffectedRowStatus($result);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

}