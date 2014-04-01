<?php

class Crm_Demoprojects_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Demoprojects_Table();
    }

    public function getList($params)
    {
        $response = new Xend_Response();

        $accountsTable = new Xend_Accounts_Table_Accounts();
        $groupsTable = new Crm_Demoprojects_Groups_Table();

        $select = $this->_table->getAdapter()->select()
            ->from(array('p' => $this->_table->getTableName()))
            ->joinLeft(array('a' => $accountsTable->getTableName()),
                'a.id=p.creator_id', array('creator_name'  => 'a.name'))
            ->join(array('g' => $groupsTable->getTableName()),
                'g.id=p.group_id', array('group_name'    => 'g.name'));

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

        $accountsTable = new Xend_Accounts_Table_Accounts();
        $select = $this->_table->getAdapter()->select()
            ->from(array('p' => $this->_table->getTableName()))
            ->joinLeft(array('a' => $accountsTable->getTableName()),
                'a.id=p.creator_id', array('creator_name'  => 'a.name'))
            ->where('p.id = ?', $id)
            ->limit(1);

        $rows = $select->query()->fetchAll();
        if (!$rows) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }
        $response->setRow($rows[0]);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function add(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'group_id'  => array('Id', 'allowEmpty' => false),
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = $f->getData();
        $data['creator_id'] = Xend_Accounts_Prototype::getId();

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

    public function updateBaseDescr(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'            => array('Id', 'presence' => 'required'),
            'group_id'      => array('Id', 'allowEmpty' => false),
            'name'          => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'customer_name' => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'address'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'object_type'   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'area'          => array('Id', 'allowEmpty' => true),
            'description'   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'stage'         => array(array('InArray', array('preparation',
                                                            'coordination',
                                                            'execution',
                                                            'implementation')
                                                            ), 'allowEmpty' => false),
            'sys_cond'              => array('Int', 'allowEmpty' => true),
            'sys_vent'              => array('Int', 'allowEmpty' => true),
            'sys_heat'              => array('Int', 'allowEmpty' => true),
            'sys_water'             => array('Int', 'allowEmpty' => true),
            'sys_electricity'       => array('Int', 'allowEmpty' => true),
            'sys_automation'        => array('Int', 'allowEmpty' => true),
            'sys_canal'             => array('Int', 'allowEmpty' => true),
            'sys_fire'              => array('Int', 'allowEmpty' => true),
            'sys_security'          => array('Int', 'allowEmpty' => true),
            'sys_internet'          => array('Int', 'allowEmpty' => true),
            'sys_phone'             => array('Int', 'allowEmpty' => true),
            'sys_radio'             => array('Int', 'allowEmpty' => true),
            'sys_tv'                => array('Int', 'allowEmpty' => true),
            'sys_dispatch'          => array('Int', 'allowEmpty' => true),
            'sys_clean'             => array('Int', 'allowEmpty' => true),
            'serv_project'          => array('Int', 'allowEmpty' => true),
            'serv_logistic'         => array('Int', 'allowEmpty' => true),
            'serv_execution'        => array('Int', 'allowEmpty' => true),
            'serv_implementation'   => array('Int', 'allowEmpty' => true)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function updateConfig(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'            => array('Id', 'presence' => 'required'),
            'sys_cond'              => array('Int', 'allowEmpty' => true),
            'sys_vent'              => array('Int', 'allowEmpty' => true),
            'sys_heat'              => array('Int', 'allowEmpty' => true),
            'sys_water'             => array('Int', 'allowEmpty' => true),
            'sys_electricity'       => array('Int', 'allowEmpty' => true),
            'sys_automation'        => array('Int', 'allowEmpty' => true),
            'sys_canal'             => array('Int', 'allowEmpty' => true),
            'sys_fire'              => array('Int', 'allowEmpty' => true),
            'sys_security'          => array('Int', 'allowEmpty' => true),
            'sys_internet'          => array('Int', 'allowEmpty' => true),
            'sys_phone'             => array('Int', 'allowEmpty' => true),
            'sys_radio'             => array('Int', 'allowEmpty' => true),
            'sys_tv'                => array('Int', 'allowEmpty' => true),
            'sys_dispatch'          => array('Int', 'allowEmpty' => true),
            'sys_clean'             => array('Int', 'allowEmpty' => true),
            'serv_project'          => array('Int', 'allowEmpty' => true),
            'serv_logistic'         => array('Int', 'allowEmpty' => true),
            'serv_execution'        => array('Int', 'allowEmpty' => true),
            'serv_implementation'   => array('Int', 'allowEmpty' => true)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function updatePlans(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'                => array('Id', 'presence' => 'required'),
            'preparation'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'coordination'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'execution'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'implementation'    => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }
}