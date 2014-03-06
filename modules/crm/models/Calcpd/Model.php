<?php

class Crm_Calcpd_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Calcpd_Table();
    }

    public function getList($params)
    {
        $response = new Xend_Response();


        $accountsTable = new Xend_Accounts_Table_Accounts();
        $objTypeTable = new Crm_Calcpd_ObjTypeTable();

        $select = $this->_table->getAdapter()->select()
            ->from(array('c' => $this->_table->getTableName()))
            ->joinLeft(array('a' => $accountsTable->getTableName()),
                'a.id=c.account_id', array('account_name' => 'a.name'))
            ->join(array('o' => $objTypeTable->getTableName()),
                'o.id=c.obj_type_id', array('obj_type_name' => 'o.name'));

        $acl = Xend_Accounts_Prototype::getAcl();
        $perm = $acl->isAllowed(
            Xend_Acl_Resource_Generator::getInstance()->calcpd->admin,
            Xend_Acl_Privilege::UPDATE
        );

        if (!$perm) {
            $select->where('c.account_id = (?)', Xend_Accounts_Prototype::getId());
        }

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

        $table = new Crm_Calcpd_ContentTable();
        $objTypeTable = new Crm_Calcpd_ObjTypeTable();
        $objClassTable = new Crm_Calcpd_ObjClassTable();
        $servTable = new Crm_Calcpd_ServTable();
        $priceTable = new Crm_Calcpd_PriceTable();

        $select = $table->getAdapter()->select()
            ->from(array('c' => $table->getTableName()), array('c.id', 'c.square'))
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
            '*'             => 'StringTrim'
        ), array(
            'obj_type_id'  => array('Id', 'allowEmpty' => false),
            'name'          => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = $f->getData();
        $data['account_id'] = Xend_Accounts_Prototype::getId();

        $id = $this->_table->insert($data);
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
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

    public function addLine(array $params)
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

        $table = new Crm_Calcpd_ContentTable();
        $rows = $table->insert($f->getData());
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function updateLine(array $params)
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

        $table = new Crm_Calcpd_ContentTable();
        $rows = $table->updateByPk(array('square' => $f->square), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function deleteLine(array $params)
    {
        $data = Zend_Json::decode($params['data']);

        $id = intval($data['id']);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }
        $table = new Crm_Calcpd_ContentTable();
        $res = $table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}