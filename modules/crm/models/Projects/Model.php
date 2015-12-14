<?php

class Crm_Projects_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Projects_Table();
    }

    public function getList($params)
    {
        $response = new Xend_Response();

        $accountsTable = new Xend_Accounts_Table_Accounts();
        $groupsTable = new Crm_Projects_Groups_Table();

        $select = $this->_table->getAdapter()->select()
            ->from(array('p' => $this->_table->getTableName()))
            ->joinLeft(array('a' => $accountsTable->getTableName()),
                'a.id=p.creator_id', array('creator_name' => 'a.name'))
            ->join(array('g' => $groupsTable->getTableName()),
                'g.id=p.group_id', array('group_name' => 'g.name'));

		$userID = Xend_Accounts_Prototype::getId();
		$acl = Xend_Accounts_Prototype::getAcl();
		$perm = $acl->isAllowed(
        	Xend_Acl_Resource_Generator::getInstance()->projects->viewall,
        	Xend_Acl_Privilege::VIEW
		);

		if (!$perm) {
        	$membersTable = new Crm_Projects_Members_Table();
			$select->joinLeft(array('m' => $membersTable->getTableName()), 'm.project_id = p.id', array('account_id', 'is_editor'));
			$select->orWhere('account_id = (?)', $userID);
			$select->orWhere('creator_id = (?)', $userID);
			$select->group('id');
		}
		
        try {
            $rows = $select->query()->fetchAll();
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
        
        $row = $rows[0];
    	$userID = Xend_Accounts_Prototype::getId();
		$accounts = new Xend_Accounts();
		if ($accounts->isAdmin($userID) || $row['creator_id'] == $userID) {
			$row['is_editor'] = 1;
		} else {
        	$members = new Crm_Projects_Members_Model();
        	$memberinfo = $members->getMemberByProjectIdAndAccountId($id, $userID);
        	if (!$memberinfo) {
        		return $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        	}
        	$row['is_editor'] = $memberinfo['is_editor']; 
		}
        
        $response->setRow($row);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function add(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'group_id'  => array('Id', 'allowEmpty' => false),
            'name'      => array(array('StringLength', 1, 4096), 'allowEmpty' => false)
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
        
        $project = $this->_table->findOne($id);
        if (!$project) {
            return $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }
        
        $userID = Xend_Accounts_Prototype::getId();
        $acl = Xend_Accounts_Prototype::getAcl();
        $perm = $acl->isAllowed(
        		Xend_Acl_Resource_Generator::getInstance()->projects->viewall,
        		Xend_Acl_Privilege::UPDATE
        );
        
        if ($project->creator_id != $userID && !$perm && !$this->_isProjectEditor($id)) {
            return $response->addStatus(new Xend_Status(Xend_Status::DELETE_FAILED));
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
            'name'          => array(array('StringLength', 1, 4096), 'allowEmpty' => false),
            'customer_name' => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'address'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'object_type'   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'area'          => array('Id', 'allowEmpty' => true),
            'description'   => array(array('StringLength', 0, 8196), 'allowEmpty' => true),
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
        
        $this->_sendMessage($f->id, 'Описание');
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
        
        $this->_sendMessage($f->id, 'Конфигурация');
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
        
        $this->_sendMessage($f->id, 'План-Факт');
        return $response->addStatus(new Xend_Status($status));
    }
    
    /**
     * Private area
     */
    
    private function _isProjectEditor($projectID)
    {
    	$projectID = intval($projectID);
    	$userID = Xend_Accounts_Prototype::getId();
    	$membersTable = new Crm_Projects_Members_Table();
    	
    	$res = $membersTable->fetchAll(array('project_id' => $projectID, 'account_id' => $userID));
    	
    	if (!$res->count() > 0) {
    	    return false;
    	}
    	
    	$row = $res->current();
    	return $row['is_editor'] > 0;
    }
    
    private function _sendMessage($project_id, $info)
    {
        if (!class_exists('PA_Messages_Model')) return;
    
        $response = $this->get($project_id);
        if ($response->hasNotSuccess()) return;
    
        // Fetch creator ID
        $projectInfo = $response->getRow();
        $creator_id = intval($projectInfo['creator_id']);
        if (!$creator_id > 0) return;
    
        $members = array($creator_id);
    
        // Fetch members IDs
        $membersModel = new Crm_Projects_Members_Model();
        $response = $membersModel->getListByProjectID($project_id);
        if ($response->hasNotSuccess()) return;
        $membersData = $response->getRowset();
         
        foreach ($membersData as $member) {
            $members[] = $member['account_id'];
        }
    
        $messageBody = 'В модуле "Производственные проекты" обновились данные в проекте "' 
                     . $projectInfo['name'] . '" на вкладке "' . $info . '".';

        $messagesModel = new PA_Messages_Model();
        $messagesModel->sendMessage(array(
                'sender_id'      => Xend_Accounts_Prototype::getId(),
                'receiver_id'    => join(',', $members),
                'message'        => $messageBody
        ), true);
    }
    
}