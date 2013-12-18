<?php

class Experts_Experts_Model
{
    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Experts_Experts_Table();
    }

    public function update($data)
    {
        $response = new Xend_Response();

        unset($data['date_update']);
        unset($data['date_create']);
        unset($data['author_id']);

        $f = new Xend_Filter_Input(array(
            'id'            => 'int',
            'account_id'    => 'int',
            'desc'          => 'StringTrim',
            'status_id'     => 'int',
            'equip_id'      => 'int',
        ), array(
            'id'            => array('int', 'presence' => 'required'),
            'account_id'    => array('Id', 'allowEmpty' => false),
            'desc'          => array('StringLength'),
            'status_id'     => array('Id', 'allowEmpty' => true),
            'equip_id'      => array('Id', 'allowEmpty' => true),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $rows = $this->_table->updateByPk($f->getData(), $f->id);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    private function _isExpertUnique($account_id)
    {
        try {
            $count = $this->_table->count(array('account_id = ?' => $account_id));
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return null;
        }

        if (0 === $count) {
            return true;
        } else {
            return false;
        }


    }

    public function add($data)
    {
        $response = new Xend_Response();

        unset($data['date_update']);
        unset($data['date_create']);
//        unset($data['account_id']);

        if(true === $data['from_current']) {
            $data['account_id'] = Xend_Accounts_Prototype::getId();
        }

        $exists = $this->_isExpertUnique($data['account_id']);

        if (null ===  $exists) {
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        } elseif (!$exists) {
            $status = Experts_Status::EXPERT_IS_ALREADY_EXISTS;
            return $response->addStatus(new Experts_Status($status));
        }

        $f = new Xend_Filter_Input(array(
            'account_id'    => 'int',
            'desc'          => 'StringTrim',
            'status_id'     => 'int',
            'equip_id'      => 'int',
        ), array(
            'account_id'    => array('Id', 'allowEmpty' => false),
            'desc'          => array('StringLength'),
            'status_id'     => array('Id', 'allowEmpty' => true),
            'equip_id'      => array('Id', 'allowEmpty' => true),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $id = $this->_table->insert($f->getData());
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
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

    public function get($id)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                array( 'e.id', 'e.account_id', 'e.desc', 'e.status_id', 'e.equip_id')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=e.account_id',
                array('name' => 'a.name')
            )
            ->joinLeft(
                array('st' => 'experts_statuses'),
                'st.id=e.status_id',
                array('status' => 'st.name')
            )
            ->joinLeft(
                array('eq' => 'experts_equipment'),
                'eq.id=e.equip_id',
                array('equipment' => 'eq.name')
            )
            ->joinLeft(
                array('c' => 'cities'),
                'c.id=a.city_id',
                array(
                    'city' => 'c.name',
                    'city_id' => 'c.id'
                )
            )
            ->joinLeft(
                array('co' => 'countries'),
                'co.id=c.country_id',
                array(
                    'country' => 'co.name',
                    'country_id' => 'co.id'
                )
            )
            ->where("e.id = ?", $id)
            ->limit(1);

        try {
            $rows = $select->query()->fetchAll();
            if(count($rows) == 0) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }
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

    public function getAll()
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                array( 'e.id', 'e.account_id', 'e.desc', 'e.status_id', 'e.equip_id')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=e.account_id',
                array('name' => 'a.name')
            )
            ->joinLeft(
                array('st' => 'experts_statuses'),
                'st.id=e.status_id',
                array('status' => 'st.name')
            )
            ->joinLeft(
                array('eq' => 'experts_equipment'),
                'eq.id=e.equip_id',
                array('equipment' => 'eq.name')
            )
            ->joinLeft(
                array('c' => 'cities'),
                'c.id=a.city_id',
                array(
                    'city' => 'c.name',
                    'city_id' => 'c.id'
                )
            )
            ->joinLeft(
                array('co' => 'countries'),
                'co.id=c.country_id',
                array(
                    'country' => 'co.name',
                    'country_id' => 'co.id'
                )
            );

        try {
            $rows = $select->query()->fetchAll();
            if(count($rows) == 0) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }
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

}