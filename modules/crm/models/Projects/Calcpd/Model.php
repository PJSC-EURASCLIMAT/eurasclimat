<?php

class Crm_Projects_Calcpd_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Projects_Calcpd_Table();
    }

    public function getList($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $objTypeTable = new Crm_Calcpd_ObjTypeTable();
        $objClassTable = new Crm_Calcpd_ObjClassTable();
        $servTable = new Crm_Calcpd_ServTable();
        $priceTable = new Crm_Calcpd_PriceTable();

        $select = $this->_table->getAdapter()->select()
            ->from(array('c' => $this->_table->getTableName()), array('c.id', 'c.square', 
            			'summ' => new Zend_Db_Expr('(CASE
                        WHEN (`square` < 500) THEN `price1`
                        WHEN (`square` >= 500 AND `square` < 1000) THEN `price2`
                        WHEN (`square` >= 1000 AND `square` < 5000) THEN `price3`
                        WHEN (`square` >= 5000 AND `square` < 10000) THEN `price4`
                        ELSE `price5` END) * square')))
            ->joinLeft(array('s' => $servTable->getTableName()),
                's.id=c.serv_id', array('serv_name' => 's.name'))
            ->joinLeft(array('ot' => $objTypeTable->getTableName()),
                'ot.id=c.obj_type_id', array('obj_type_name' => 'ot.name'))
            ->joinLeft(array('oc' => $objClassTable->getTableName()),
                'oc.id=c.obj_class_id', array('obj_class_name' => 'oc.name'))
            ->joinLeft(array('p' => $priceTable->getTableName()),
                new Zend_Db_Expr('(c.obj_type_id=p.obj_type_id AND
                 c.obj_class_id=p.obj_class_id AND
                 c.serv_id=p.serv_id)'), array('price' =>
                    new Zend_Db_Expr('CASE
                        WHEN (`square` < 500) THEN `price1`
                        WHEN (`square` >= 500 AND `square` < 1000) THEN `price2`
                        WHEN (`square` >= 1000 AND `square` < 5000) THEN `price3`
                        WHEN (`square` >= 5000 AND `square` < 10000) THEN `price4`
                        ELSE `price5` END
                    ')
                ))
            ->where('c.project_id = ?', $id);

//        die($select->assemble());

        try {
            $rows = $select->query()->fetchAll();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::DATABASE_ERROR));
        }

        $response->setRowset($rows);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function add(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'project_id'    => array('Id', 'allowEmpty' => false, 'presence' => 'required'),
            'serv_id'       => array('Id', 'allowEmpty' => false, 'presence' => 'required'),
            'obj_type_id'   => array('Id', 'allowEmpty' => false, 'presence' => 'required'),
            'obj_class_id'  => array('Id', 'allowEmpty' => false, 'presence' => 'required'),
            'square'        => array(array('StringLength', 0, 50), 'allowEmpty' => false, 'presence' => 'required')
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->insert($f->getData());
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function update(array $params)
    {
        $data = Zend_Json::decode($params['data']);

        $f = new Xend_Filter_Input(array(
            'id'        => 'Int',
            'square'    => 'StringTrim'
        ), array(
            'id'        => array('Id', 'allowEmpty' => false, 'presence' => 'required'),
            'square'    => array(array('StringLength', 0, 50), 'allowEmpty' => false, 'presence' => 'required')
        ), $data);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk(array('square' => $f->square), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function delete(array $params)
    {
        $data = Zend_Json::decode($params['data']);

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