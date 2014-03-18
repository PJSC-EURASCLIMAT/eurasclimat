<?php

class Crm_Projects_Members_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Projects_Members_Table();
    }

    public function get($id)
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
                array( 'm.id', 'm.account_id', 'm.role')
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
}