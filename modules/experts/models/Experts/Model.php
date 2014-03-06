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
        $this->_accountsModel = new Xend_Accounts();
        $this->_messagesModel = new PA_Messages_Model();
        $this->_docsModel = new Experts_ExpertsDocs_Model();
    }

    public function activate($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'id'            => 'int',
            'active'        => 'int',
        ), array(
            'id'            => array('int', 'presence' => 'required'),
            'active'        => array('int', 'presence' => 'required'),
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

        //Права

        $account_id = $this->getAccountIdByExpertId($f->id);
        $accountResponse = $this->_accountsModel->fetchAccount($account_id);

        $account = $accountResponse->getRowset();
        $accRoles = $account['roles'];

        $roles = array();

        for ($i = 0; $i < count($accRoles); $i++) {
            if(intval($accRoles[$i]['id']) != EXPERT_ROLE) {
                $id = intval($accRoles[$i]['id']);
                array_push($roles, array('id' => $id));
            }
        }

        // TODO наверное лучше вынести в Xend_Accounts, + роль, - роль

        //Отправка мессаджа
        if (intval($f->active) == 0) {
            $message = "Вы больше не специалист";
        } else if(intval($f->active) == 1) {
            $message = "Вы одобрены как специалист";
            $roles[] = array('id' => EXPERT_ROLE);
        }

        $this->_accountsModel->setRoles($account_id, $roles);

        $data = array(
            'type'          => 2,
            'receiver_id'   => $account_id,
            'owner_id'      => $account_id,
            'subject'        => 'Активация специалиста',
            'message'       => $message
        );
        $this->_messagesModel->add($data, true, true);

        // TODO Удалять или добавлять роль Спеца

        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function update($data)
    {
        $response = new Xend_Response();

        unset($data['date_update']);
        unset($data['date_create']);
        unset($data['author_id']);
        unset($data['active']);

        $f = new Xend_Filter_Input(array(
            'id'            => 'int',
            'account_id'    => 'int',
            'desc'          => 'StringTrim',
            'status_id'     => 'int',
            'equip_id'      => 'int',
            'rating'        => 'int',
            'work_years'    => 'int',
            'study_years'   => 'int',
            'sert_count'    => 'int',
        ), array(
            'id'            => array('int', 'presence' => 'required'),
            'account_id'    => array('Id', 'allowEmpty' => false),
            'desc'          => array('StringLength'),
            'status_id'     => array('Id', 'allowEmpty' => true),
            'equip_id'      => array('Id', 'allowEmpty' => true),
            'rating'        => array('int', 'allowEmpty' => true),
            'work_years'    => array('int', 'allowEmpty' => true),
            'study_years'   => array('int', 'allowEmpty' => true),
            'sert_count'    => array('int', 'allowEmpty' => true),
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

//        if(true === $data['from_current']) {
//            $data['account_id'] = Xend_Accounts_Prototype::getId();
//        }

        $exists = $this->_isExpertUnique($data['account_id']);

        $accountResponse = $this->_accountsModel->fetchAccount($data['account_id']);
        if (!$accountResponse->isSuccess()) {
            return $accountResponse;
        }
        $accountData = $accountResponse->getRowset();

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
            'rating'        => 'int',
            'work_years'    => 'int',
            'study_years'   => 'int',
            'sert_count'    => 'int',
        ), array(
            'account_id'    => array('Id', 'allowEmpty' => false),
            'desc'          => array('StringLength'),
            'status_id'     => array('Id', 'allowEmpty' => true),
            'equip_id'      => array('Id', 'allowEmpty' => true),
            'rating'        => array('int', 'allowEmpty' => true),
            'work_years'    => array('int', 'allowEmpty' => true),
            'study_years'   => array('int', 'allowEmpty' => true),
            'sert_count'    => array('int', 'allowEmpty' => true),
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

        // Массовая рассылка доброй вести админам
        $adminsResponse = $this->_accountsModel->fetchByRole(ADMIN_ROLE);
        $admins = $adminsResponse->getRowset();

        $registry = Zend_Registry::getInstance();
        $mesTypes = $registry->sys->mesTypes;

        for ($i = 0; $i < count($admins); $i++) {
            $data = array(
                'type'           => $mesTypes['SYSTEM'],
                'receiver_id'    => $admins[$i]['id'],
                'owner_id'       => $admins[$i]['id'],
                'subject'        => 'Новый специалист',
                'message'        => 'Зарегистрирован новый специалист - <a href="http://'.$_SERVER['HTTP_HOST'].'/#/profile/'. $f->account_id .'/show"> '. $accountData['name'] .'</a>'
            );
            $this->_messagesModel->add($data, true, true);
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

        //Удалние всех документов эксперта
        $docsResponse = $this->_docsModel->getByExpert($id);
        if (!$docsResponse->isSuccess()) {
            return $docsResponse;
        }
        $docs = $docsResponse->getRowset();
        for ($i = 0; $i < count($docs); $i++ ) {
            $doc = $docs[$i];
            $deleteDocResponse = $this->_docsModel->delete($doc);
            if (!$deleteDocResponse ->isSuccess()) {
                return $deleteDocResponse ;
            }
        }

        //Удалние самого эксперта
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
                array( 'e.id', 'e.account_id', 'e.desc', 'e.status_id',
                    'e.equip_id', 'e.active', 'e.rating', 'e.rating',
                    'e.work_years', 'e.study_years','e.sert_count')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=e.account_id',
                array(
                    'name' => 'a.name',
                    'login' => 'a.login'
                )
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

            $avatar_path = IMAGES_DIR . DIRECTORY_SEPARATOR . 'users' . DIRECTORY_SEPARATOR . $rows[0]['account_id'] . '.jpg';
            $rows[0]['have_avatar'] = (file_exists($avatar_path)) ? 1 : 0;

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

    public function getJobTypes($id)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                array( 'e.id', 'e.account_id', 'e.desc', 'e.status_id', 'e.equip_id', 'e.active',
                    'e.rating', 'e.work_years', 'e.study_years','e.sert_count')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=e.account_id',
                array(
                    'name' => 'a.name',
                    'login' => 'a.login'
                )
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

            $avatar_path = IMAGES_DIR . DIRECTORY_SEPARATOR . 'users' . DIRECTORY_SEPARATOR . $rows[0]['account_id'] . '.jpg';
            $rows[0]['have_avatar'] = (file_exists($avatar_path)) ? 1 : 0;

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

    public function getByAccountId($account_id)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                array( 'e.id', 'e.account_id', 'e.desc', 'e.status_id', 'e.equip_id', 'e.active',
                    'e.rating', 'e.work_years', 'e.study_years','e.sert_count')
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
            ->where("e.account_id = ?", $account_id)
            ->limit(1);

        try {
            $rows = $select->query()->fetchAll();
            if(count($rows) == 0) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }
            $response->setRowset($rows[0]);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new Xend_Status($status));
    }

    public function getAll($where, $params = array())
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                array( 'e.id', 'e.account_id', 'e.desc', 'e.status_id', 'e.equip_id', 'e.active',
                    'e.rating', 'e.work_years', 'e.study_years','e.sert_count')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=e.account_id',
                array(
                    'name' => 'a.name',
                    'login' => 'a.login'
                )
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
                array('e2j' => 'experts2job_types'),
                'e2j.expert_id=e.id',
                array(
                    'job_type_id' => 'e2j.job_type_id'
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
            ->group('e.id');

            if (isset($where)) {
                $select->where($where[0], $where[1]);
            }

            $plugin = new Xend_Db_Plugin_Select($this->_table, $select, array(
                'city_id',
                'job_type_id',
                'equip_id',
                'status_id',
                'rating'
            ));
            $plugin->parse($params);

        try {
            $rows = $select->query()->fetchAll();

            for ($i = 0; $i < count($rows); $i++ ) {
                $row = $rows[$i];

                $avatar_path = IMAGES_DIR . DIRECTORY_SEPARATOR . 'users' . DIRECTORY_SEPARATOR . $rows[$i]['account_id'] . '.jpg';
                $rows[$i]['have_avatar'] = (file_exists($avatar_path)) ? 1 : 0;
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


    public function getExpertIdByAccountId($accountId)
    {
        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                array( 'e.id')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=e.account_id',
                null
            )
            ->where("e.account_id = ?", $accountId);
//            ->limit(1);

        try {
            $rows = $select->query()->fetch();
            if(count($rows) == 0) {
                return null;
            }
            return $rows['id'];
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }
    }

    public function getAccountIdByExpertId($expertId)
    {
        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                array( 'e.id')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=e.account_id',
                array(
                    'account_id' => 'a.id'
                )
            )
            ->where("e.id = ?", $expertId)
            ->limit(1);

        try {
            $rows = $select->query()->fetchAll();
            if(count($rows) == 0) {
                return null;
            }
            return $rows[0]['account_id'];
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }
    }

    public function getCities()
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                null
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=e.account_id',
                array('name' => 'a.name')
            )
            ->join(
                array('c' => 'cities'),
                'c.id=a.city_id',
                array(
                    'name' => 'c.name',
                    'id' => 'c.id'
                )
            );

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


}