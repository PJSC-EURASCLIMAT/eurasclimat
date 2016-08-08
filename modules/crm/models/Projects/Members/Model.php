<?php

class Crm_Projects_Members_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Projects_Members_Table();
    }

    public function getListByProjectID($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('m' => $this->_table->getTableName()),
                array( 'm.id', 'm.account_id', 'm.role', 'm.is_editor')
            )
            ->joinLeft(array('a' => 'accounts'), 'a.id=m.account_id',
                array('account_name' => 'a.name')
            )
            ->joinLeft(array('c' => 'cities'), 'c.id=a.city_id',
                array('city' => 'c.name')
            )
            ->joinLeft(array('co' => 'countries'), 'co.id=c.country_id',
                array('country' => 'co.name')
            )
            ->where('m.project_id = (?)', $id);

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
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function add($project_id, $account_id, $role)
    {
        $response = new Xend_Response();

        try {
            $this->_table->insert(array(
                'project_id'    => $project_id,
                'account_id'    => $account_id,
                'role'          => $role
            ));
        } catch(Exception $e) {
            return $response->addStatus(new Xend_Status(Xend_Status::ADD_FAILED));
        }

        $this->_SendNotify($project_id, $account_id, $role);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function delete($id)
    {
        $response = new Xend_Response();
        $validator = new Xend_Validate_Id();
        $id = intval($id);
        if (!$validator->isValid($id)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $res = $this->_table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function edit($id, $value)
    {
        $response = new Xend_Response();
        
        $id = intval($id);
        $validator = new Xend_Validate_Id();
        if (!$validator->isValid($id)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }
        
        $value = intval($value);
        $validator = new Xend_Validate_Id(true);
    	if (!$validator->isValid($value)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'value'));
        }

        $res = $this->_table->updateByPk(array('is_editor' => $value), $id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function getMemberByProjectIdAndAccountId($projectID, $accountID) 
    {
    	$projectID = intval($projectID);
    	$accountID = intval($accountID);
        if (0 == $accountID || 0 == $projectID) {
            return false;
        }

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('m' => $this->_table->getTableName()),
                array( 'm.id', 'm.account_id', 'm.role', 'm.is_editor')
            )
            ->joinLeft(array('a' => 'accounts'), 'a.id=m.account_id',
                array('account_name' => 'a.name')
            )
            ->joinLeft(array('c' => 'cities'), 'c.id=a.city_id',
                array('city' => 'c.name')
            )
            ->joinLeft(array('co' => 'countries'), 'co.id=c.country_id',
                array('country' => 'co.name')
            )
            ->where('m.project_id = (?)', $projectID)
            ->where('m.account_id = (?)', $accountID)
            ;

        try {
            $rows = $select->query()->fetchAll();
            if (!$rows || !is_array($rows) || count($rows) < 1) {
            	return false;	
            }
            return $rows[0];
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return false;
        }
    }
    
    private function _SendNotify($project_id, $account_id, $role)
    {
        $messenger = new PA_Messages_Model();

        $projectsModel = new Crm_Projects_Model();
        $project = $projectsModel->get($project_id)->getRow();

        $registry = Zend_Registry::getInstance();
        $mesTypes = $registry->sys->mesTypes;

        $data = array(
            'type'           => $mesTypes['SYSTEM'],
            'receiver_id'    => $account_id,
            'owner_id'       => $account_id,
            'subject'        => 'Добавлен проект',
            'message'        => 'Вы стали участником проекта "'
                             . $project['name'] . '" №' . $project_id
                             . ' в роли "' . $this->_getRoleTitleByName($role) . '"'
        );
        $messenger->add($data, true, true);
    }

    private function _getRoleTitleByName($role)
    {
        switch ($role) {
            case 'customer': return 'Представитель заказчика';
            case 'manager': return 'Менеджер проекта';
            case 'projector': return 'Отдел проектирования';
            case 'logistic': return 'Отдел логистики';
            case 'productor': return 'Производственный отдел';
            case 'bookkeeper': return 'Финансовый отдел';
            case 'commercial': return 'Коммерческий отдел';
            case 'lawyer': return 'Юридический отдел';
            case 'clerk': return 'Отдел делопроизводства';
            case 'adv': return 'Отдел рекламы и маркетинга';
            case 'metalconst': return 'Производство металоконструкций';
            case 'provider': return 'Поставщик';
        	case 'contractor': return 'Подрядчик';
            default: return $role;
        }
    }
}