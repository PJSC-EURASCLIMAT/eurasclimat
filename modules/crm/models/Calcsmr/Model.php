<?php

class Crm_Calcsmr_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Calcsmr_Table();
    }

    public function getList($params)
    {
        $response = new Xend_Response();

        $accountsTable = new Xend_Accounts_Table_Accounts();

        $select = $this->_table->getAdapter()->select()
            ->from(array('c' => $this->_table->getTableName()))
            ->joinLeft(array('a' => $accountsTable->getTableName()),
                'a.id=c.account_id', array('account_name' => 'a.name'));

//        $acl = Xend_Accounts_Prototype::getAcl();
//        $perm = $acl->isAllowed(
//            Xend_Acl_Resource_Generator::getInstance()->admin,
//            Xend_Acl_Privilege::UPDATE
//        );
//
//        if (!$perm) {
//            $select->where('c.account_id = (?)', Xend_Accounts_Prototype::getId());
//        }

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

    public function add(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'name'              => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_compensation'    => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_overheads'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_estimated'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_vat'             => array(array('StringLength', 1, 255), 'allowEmpty' => false)
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

    public function update(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'id'                => array(array('Id'), 'allowEmpty' => false),
            'name'              => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_compensation'    => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_overheads'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_estimated'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_vat'             => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = $f->getData();
        unset($data['id']);
        unset($data['account_id']);
        unset($data['date']);

        $id = $this->_table->updateByPk($data, $f->id);
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

    public function copy(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'id'                => array(array('Id'), 'allowEmpty' => false),
            'name'              => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $project = $this->_table->findOne($f->id);

        if (NULL === $project || false === $project) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
        }

        $data = $project->toArray();
        unset($data['id']);
        unset($data['date']);
        $data['account_id'] = Xend_Accounts_Prototype::getId();
        $data['name'] = $f->name;

        $id = $this->_table->insert($data);
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $this->_copyProject($f->id, $id);

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    private function _copyProject($fromID, $toID)
    {
        $table = new Crm_Calcsmr_ProjectsTable();

        $systems = $table->fetchAll(array('project_id = (?)' => $fromID))->toArray();
        foreach ($systems as $sys) {
            $data = $sys;
            unset($data['id']);
            $data['project_id'] = $toID;
            $id = $table->insert($data);
            if (!$id) continue;
            $this->_copySystem($sys['id'], $id);
        }
    }

    private function _copySystem($fromID, $toID)
    {
        $table = new Crm_Calcsmr_SystemsTable();

        $items = $table->fetchAll(array('system_id = (?)' => $fromID))->toArray();
        foreach ($items as $item) {
            $data = $item;
            unset($data['id']);
            $data['system_id'] = $toID;
            $table->insert($data);
        }
    }
}