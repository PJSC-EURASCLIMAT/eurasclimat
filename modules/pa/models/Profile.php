<?php

/**
 * General class for manipulate accounts
 */
class PA_Profile
{
    /**
     * The accounts table
     *
     * @var Xend_Accounts_Table_Accounts
     */
    protected $_tableAccounts;

    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->_tableAccounts = new Xend_Accounts_Table_Accounts();
    }

    /**
     * Fetch account information by id
     *
     * @param int $accountId    The account id
     * @return Xend_Response
     * <code> array(
     *     'rowset' => Zend_Db_Table_Row | null
     * )
     * </code>
     */
    public function fetchAccount($accountId)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($accountId)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INPUT_PARAMS_INCORRECT, 'account_id'));
        }

        $select = $this->_tableAccounts->getAdapter()->select()
            ->from(
                array('a' => $this->_tableAccounts->getTableName()),
                array( 'a.id', 'a.login', 'a.name', 'a.active', 'a.lang', 'a.tz')
            )
            ->joinLeft(
                array('c' => 'cities'),
                'c.id=a.city_id',
                array(
                    'city' => 'c.name',
                    'city_id' => 'a.city_id'
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
            ->joinLeft(
                array('ex' => 'experts'),
                'ex.account_id=a.id',
                array(
                    'expert_id' => 'ex.id'
                )
            )
            ->where("a.id = ?", $accountId)
            ->limit(1);

        try {
            $rowset = $select->query()->fetchAll();
            if(count($rowset) == 0) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }
            $response->setRowset($rowset);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }

        if (!is_null($rowset[0])) {
            $rowset = $rowset[0];
        } elseif (empty($rowset)) {
            $rowset = array();
        }

        $rolesAccountsTable = new Xend_Acl_Table_RolesAccounts();
        $rowset['roles'] = $rolesAccountsTable->getRoles($accountId);

        $avatar_path = IMAGES_DIR . DIRECTORY_SEPARATOR . 'users' . DIRECTORY_SEPARATOR . $rowset['id'] . '.jpg';

        $rowset['have_avatar'] = (file_exists($avatar_path)) ? 1 : 0;

        $response->rowset = $rowset;
        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Accounts_Status(Xend_Accounts_Status::OK));
    }

    public function get($id)
    {
        $response = new Xend_Response();

        $select = $this->_tableAccounts->getAdapter()->select()
            ->from(
                array('e' => 'experts'),
                array( 'e.id', 'e.account_id', 'e.desc', 'e.status_id', 'e.equip_id', 'e.active')
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
            ->where("a.id = ?", $id)
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


    /**
     * Update account
     *
     * @param int $id       The account id
     * @param array $data   Update data
     */
    public function update(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'id'        => 'int',
//            'login'     => 'StringTrim',
            'name'      => 'StringTrim',
            'email'     => 'StringTrim',
//            'active'    => 'boolean'
        ), array(
            'id'        => array('id', 'presence' => 'required'),
            'name'      => array('StringLength'),
            'email'     => array('EmailAddress'),
//            'active'    => array('boolean', 'presence' => 'required')
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        if ($f->id == Xend_Accounts_Prototype::getId() && !$f->active) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::ACCOUNT_IS_PROTECTED));
        }

        try {
            $affectedRows = $this->_tableAccounts->updateByPk($f->getData(), $f->id);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::FAILURE;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }



        $response->affectedRows = $affectedRows;

        /*
       * Заливка аватарки
       * */
//      валидация картинки
        if($_FILES['photo']['size'] != 0){
            $file = new Xend_File();
            $avatar = $file->uploadThumbnail('users',$data['id'],'photo');
        }


        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    /**
     * Change own password by user
     *
     * @param int $id       The account id
     * @param array $data   contains old password and new one (old_password, new_password1, new_password2)
     * @return Xend_Response
     * <data>
     * array(
     *  affectedRows: int
     * )
     * </data>
     */
    public function chPassword($id, array $data)
    {
        $response = new Xend_Response();
        $data['id'] = $id;

        $f = new Xend_Filter_Input(array(
            '*'     => array('StringTrim')
        ), array(
            'id'            => array('Id', 'presence' => 'required'),
            'old_password'  => array('password', 'presence' => 'required'),
            'new_password1'  => array('password', 'presence' => 'required'),
            'new_password2'  => array('password', 'presence' => 'required')
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $password = $this->_tableAccounts->fetchPassword($id);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        if (!$password) {
            $status = Xend_Accounts_Status::ACCOUNT_IS_NOT_EXISTS;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        if ($password !== md5($f->old_password)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::WRONG_PASSWORD, 'old_password'));
        }

        if ($f->new_password1 !== $f->new_password2) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INCORRECT_NEW_PASSWORD, 'new_password2'));
        }

        try {

            $affectedRows = $this->_tableAccounts->updateByPk(array(
                'password' => md5($f->new_password1)
            ), $id);

            $response->affectedRows = $affectedRows;
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRows)));

        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

    }

}