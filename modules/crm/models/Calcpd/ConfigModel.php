<?php

class Crm_Calcpd_ConfigModel
{
	public function info()
	{
		$response = new Xend_Response();
	
		$objTypeTable = new Crm_Calcpd_ObjTypeTable();
		$objClassTable = new Crm_Calcpd_ObjClassTable();
		$servTable = new Crm_Calcpd_ServTable();
		$priceTable = new Crm_Calcpd_PriceTable();
	
		$select = $priceTable->getAdapter()->select();
	
		try {
			$rowsType = $objTypeTable->fetchAll();
			$rowsClass = $objClassTable->fetchAll();
			$rowsServ = $servTable->fetchAll();
			$rowsPrice = $priceTable->fetchAll();
			if (!$rowsType || !$rowsClass || !$rowsServ) {
				return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
			}
		} catch (Exception $e) {
			if (DEBUG) {
				throw $e;
			}
			return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
		}
	
		$typeList = $rowsType->toArray();
		$classList = $rowsClass->toArray();
		$servList = $rowsServ->toArray();
		$priceList = $rowsPrice->toArray();
	
		$data = array();
		$id = 1;
		foreach ($typeList as $t) {
			foreach ($classList as $c) {
				foreach ($servList as $s) {
	
					$price = array(
							'price1'        => 0,
							'price2'        => 0,
							'price3'        => 0,
							'price4'        => 0,
							'price5'        => 0
					);
	
					foreach($priceList as $p) {
	
						if ($t['id'] == $p['obj_type_id']
								&&  $c['id'] == $p['obj_class_id']
								&&  $s['id'] == $p['serv_id']) {
	
									$price = array(
											'price1'        => $p['price1'],
											'price2'        => $p['price2'],
											'price3'        => $p['price3'],
											'price4'        => $p['price4'],
											'price5'        => $p['price5']
									);
									break;
								}
					}
	
					$data[] = array_merge(array(
							'id'        => $id++,
							'obj_type'  => $t['name'],
									'obj_class' => $c['name'],
									'serv'      => $s['name']
					), $price);
				}
			}
		}

		$response->setRowset($data);
		return $response->addStatus(new Xend_Status(Xend_Status::OK));
	}
	
    public function getObjTree()
    {
        $response = new Xend_Response();

        $objTypeTable = new Xend_Db_Table_Factory('calcpd_obj_type');
        $objClassTable = new Xend_Db_Table_Factory('calcpd_obj_class');
        $servTable = new Xend_Db_Table_Factory('calcpd_serv');

        try {
            $rowsType = $objTypeTable->fetchAll();
            $rowsClass = $objClassTable->fetchAll();
            $rowsServ = $servTable->fetchAll();
            if (!$rowsType || !$rowsClass || !$rowsServ) {
                return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
            }
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $typeList = $rowsType->toArray();
        $classList = $rowsClass->toArray();
        $servList = $rowsServ->toArray();
        $data = array();

        foreach ($typeList as $t) {
            $tmp = array();
            foreach ($classList as $c) {
                $tmpServ = array();
                foreach ($servList as $s) {
                    $tmpServ[] = array(
                        'leaf'          => true,
                        'text'          => $s['name'],
                        'obj_type_id'   => $t['id'],
                        'obj_class_id'  => $c['id'],
                        'serv_id'       => $s['id']
                    );
                }
                $tmp[] = array(
                    'expanded'      => false,
                    'leaf'          => false,
                    'text'          => $c['name'],
                    'obj_type_id'   => 0,
                    'obj_class_id'  => 0,
                    'serv_id'       => 0,
                    'children'      => $tmpServ
                );
            }
            $data[] =  array(
                'expanded'      => false,
                'leaf'          => false,
                'text'          => $t['name'],
                'obj_type_id'   => 0,
                'obj_class_id'  => 0,
                'serv_id'       => 0,
                'children'      => $tmp
            );
        }

        $response->setRowset($data);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function getPrice($obj_type_id, $obj_class_id, $serv_id)
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

        if (!$validate->isValid($serv_id)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'serv_id'));
        }

        $priceTable = new Xend_Db_Table_Factory('calcpd_price');

        $select = $priceTable->getAdapter()->select()
            ->from(array('s' => $priceTable->getTableName()), '*')
            ->where('obj_type_id = ?', $obj_type_id)
            ->where('obj_class_id = ?', $obj_class_id)
            ->where('serv_id = ?', $serv_id)
            ->limit(1);

        try {
            $rows = $select->query()->fetchAll();
            $row = !empty($rows) ? $rows[0]
                 : array(
                    'obj_type_id'   => $obj_type_id,
                    'obj_class_id'  => $obj_class_id,
                    'serv_id'       => $serv_id,
                    'price1'        => 0,
                    'price2'        => 0,
                    'price3'        => 0,
                    'price4'        => 0,
                    'price5'        => 0
                 );
            $response->setRow($row);
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

        if (!$validate->isValid($data['serv_id'])) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'serv_id'));
        }

        $select = $priceTable->getAdapter()->select()
            ->from($priceTable->getTableName())
            ->where('obj_type_id = ?', $data['obj_type_id'])
            ->where('obj_class_id = ?', $data['obj_class_id'])
            ->where('serv_id = ?', $data['serv_id'])
            ->limit(1);

        try {
            $rows = $select->query()->fetchAll();
            if (!empty($rows)) {
                $priceTable->updateByPk($data, $rows[0]['id']);
            } else {
                $priceTable->insert($data);
            }
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
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