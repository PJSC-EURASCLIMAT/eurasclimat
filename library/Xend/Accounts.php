<?php

/**
 * General class for manipulate accounts
 */
class Xend_Accounts
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

        $rowset = $this->_tableAccounts->findOne($accountId);
        if (!is_null($rowset)) {
            $rowset = $rowset->toArray();
        } elseif (empty($rowset)) {
            $rowset = array();
        }
        $response->rowset = $rowset;
        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Accounts_Status(Xend_Accounts_Status::OK));
    }

    /**
     * Retrieve account information by login and password
     *
     * @param string $login         The account login
     * @param string $password      The account password
     * @return Xend_Response
     */
    public function fetchByLoginPassword($login, $password)
    {
        $response = new Xend_Response();

        try {
            $row = $this->_tableAccounts->fetchRow(array(
                'login = ?'     => $login,
                'password = ?'  => $password
            ));

            if (!is_null($row)) {
                $row = $row->toArray();
                unset($row['state']);
            }

            $response->row = $row;

        } catch (Exception $e) {
            $row = null;
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        if (is_null($row)) {
            $status = Xend_Accounts_Status::FAILURE;
        } else {
            $status = Xend_Accounts_Status::OK;
        }

        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    /**
     * Fetch accounts by role
     * @see _fetchAll()
     *
     * @param int $roleId       The account role
     * @param array $params
     *
     * @return Xend_Response
     */
    public function fetchByRole($roleId, array $params = array())
    {
        $validate = new Xend_Validate_Id(true);
        if (!$validate->isValid($roleId)) {
            return new Xend_Response(new Xend_Acl_Status(
                Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'role_id'));
        }

        $clause = array();
        if (!empty($roleId)) {
            $clause = array('role_id = ?' => $roleId);
        }
        return $this->_fetchAll($clause, $params);
    }


    /**
     * Fetches all rows
     *
     * @param array $params
     * The param examples<code>
     *      sort    => 'name'
     *      dir     => 'ASC'
     *      limit   => 20
     *      start   => 1
     *      ...
     *      filter[0][data][type]   string
     *      filter[0][data][value]  1
     *      filter[0][field]        alias
     * </code>
     * @param array $where      The array of where clauses<code>
     *  array(
     *      array('name = ?' => test),
     *      array('company_id = ?' => 1)
     *  );</code>
     *
     * @return Xend_Response
     * Details of contain data <code>
     *      rows array          The modules collection
     *      total int           The total count of rows
     * </code>
     */
    protected function _fetchAll($where, array $params = array())
    {
        $response = new Xend_Response();
        $select = $this->_tableAccounts->getAdapter()->select();
        $select->from(array('a' => $this->_tableAccounts->getTableName()));

        $plugin = new Xend_Db_Plugin_Select($this->_tableAccounts, $select);
        $plugin->parse($params);

        if (!empty($where)) {
            foreach ($where as $key => $value) {
                $select->where($key, $value);
            }
        }

        $status = null;
        try {
            $rowset = $select->query()->fetchAll();
            $response->setRowset($rowset);
            $response->total = $plugin->getTotalCount();
            $status = Xend_Acl_Status::OK;

        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }

            $status = Xend_Acl_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Acl_Status($status));
    }

    /**
     * @see _fetchAll()
     *
     * @return Xend_Response
     */
    public function fetchAll(array $params = array())
    {
        return $this->_fetchAll(array(), $params);
    }

    /**
     * Change account role
     *
     * @param int|array $accountId        The account id
     * @param int $roleId                 The role id
     * @return Xend_Response
     */
    public function changeRole($accountIds, $roleId)
    {
        $response = new Xend_Response();


        $validateRole = new Xend_Validate_Id(true);
        if (!$validateRole->isValid($roleId)) {
            return $response->addStatus(new Xend_Acl_Status(
                Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'role_id'));
        }

        if (!is_array($accountIds)) {
            $accountIds = array($accountIds);
        }

        $validateAccount = new Xend_Validate_Id();
        foreach ($accountIds as $accountId) {
            if (!$validateAccount->isValid($accountId)) {
                return $response->addStatus(new Xend_Acl_Status(
                    Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'account_id'));
            }

            if ($this->isRemoteauthEnabled() && $this->isAdmin($accountId)) {
                continue;
            }

            $affectedRows = $this->_tableAccounts->updateByPk(array(
                'role_id'   => $roleId
            ), $accountId);

            if (false === $affectedRows) {
                return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::DATABASE_ERROR));
            }
        }

        return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
    }

    /**
     * Update account
     *
     * @param int $id       The account id
     * @param array $data   Update data
     */
    public function update($id, array $data = array())
    {
        $response = new Xend_Response();

        if ($this->isRemoteauthEnabled() && $this->isAdmin($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::ACCOUNT_IS_PROTECTED));
        }

        $data['id'] = $id;
        $f = new Xend_Filter_Input(array(
            'id'        => 'int'
        ), array(
            'id'        => array('id', 'presense' => 'required'),
            'email'     => array('EmailAddress', 'presense' => 'required'),
            'active'    => array('boolean')
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $affectedRows = $this->_tableAccounts->updateByPk(array(
            'email'     => $f->email,
            'phone'     => $f->phone,
            'name'      => $f->name,
            'active'    => $f->active
        ), $f->id);

        $response->affectedRows = $affectedRows;
        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRows)));
    }

    /**
     * Update personal information account
     *
     * @param int $id       The account id
     * @param array $data   Updated personal data
     * @return Xend_Response
     * <data>
     * array(
     *  affectedRows: int
     * )
     * </data>
     */
    public function updatePersonalInformation($id, array $data = array())
    {
        $response = new Xend_Response();

        if ($this->isRemoteauthEnabled() && $this->isAdmin($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::ACCOUNT_IS_PROTECTED));
        }

        $data['id'] = $id;
        $f = new Xend_Filter_Input(array(
            'id'    => 'int'
        ), array(
            'id'    => array('id', 'presense' => 'required'),
            'email' => array('EmailAddress', 'presense' => 'required')
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $affectedRows = $this->_tableAccounts->updateByPk(array(
            'email' => $f->email,
            'phone' => $f->phone,
            'name'  => $f->name
        ), $f->id);

        $response->affectedRows = $affectedRows;
        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRows)));
    }

    /**
     * Update account field by name
     *
     * @param int $id           The account id
     * @param string $field     Available field in database
     * @param mixed $value      Field value
     * @return Xend_Response
     */
    public function updateByField($id, $field, $value)
    {
        $response = new Xend_Response();

        if ($this->isRemoteauthEnabled() && $this->isAdmin($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::ACCOUNT_IS_PROTECTED));
        }

        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            return $response->addStatus(new Xend_Acl_Status(
                Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $fieldValidate = null;
        $field = strtolower($field);

        switch ($field) {
            case 'name':
                $fieldValidate = new Zend_Validate_NotEmpty();
                break;

            case 'email':
                $fieldValidate = new Zend_Validate_EmailAddress();
                break;

            case 'active':
                $fieldValidate = new Xend_Validate_Boolean();
                break;

            case 'phone':
                break;

            default:
                return $response->addStatus(new Xend_Acl_Status(
                    Xend_Acl_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        if ($fieldValidate instanceof Zend_Validate_Interface) {
            if (!$fieldValidate->isValid($value) || !$this->_tableAccounts->isAllowedField($field)) {
                return $response->addStatus(new Xend_Acl_Status(
                    Xend_Acl_Status::INPUT_PARAMS_INCORRECT, $field));
            }
        }
        $affectedRows = false;

        // try to set method catcher before common method
        $method = '_set' . ucfirst($field) . 'Account';
        if (method_exists($this, $method)) {
            $affectedRows = $this->{$method}($id);
        } else {
            $affectedRows = $this->_tableAccounts->updateByPk(array(
                $field  => $value
            ), $id);
        }

        return $response->addStatus(new Xend_Acl_Status(
            Xend_Acl_Status::retrieveAffectedRowStatus($affectedRows)));
    }

    /**
     * Create new account
     *
     * @param array $data
     * <code>
     *  login       string  REQUIRED
     *  password    string  REQUIRED
     * </code>
     * @return Xend_Response
     * <code>
     *  id: int
     * </code>
     */
    public function createAccount(array $data)
    {
        $response = new Xend_Response();

        $max_accounts = Zend_Registry::get('config')->accounts->max;
        if ($this->getCount() >= $max_accounts) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::ACCOUNT_MAX_REACHED));
        }

        $f = new Xend_Filter_Input(array(
            '*'     => array('StringTrim')
        ), array(
            'login'     => array('login', 'presense' => 'required'),
            'password'  => array('password', 'presense' => 'required'),
            'roleId'    => array(array('Id', array(true)))
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $login = $f->login;
        $password = $f->password;
        $roleId = $f->roleId;
        $existsResponse = $this->accoutExists($login);
        if ($existsResponse->isError()) {
            return $existsResponse;
        }

        $id = $this->_tableAccounts->insert(array(
            'login'     => $login,
            'password'  => md5($password),
            'role_id'   => $roleId
        ));

        $status = Xend_Accounts_Status::FAILURE;
        if ($id > 0) {
            $status = Xend_Accounts_Status::OK;
            $response->id = $id;
        }

        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    /**
     * Check if present account
     *
     * @param string $login
     * @return Xend_Response
     * <code>
     *  exists: bool
     * </code>
     */
    public function accoutExists($login)
    {
        $f = new Zend_Filter_StringTrim();
        $login = $f->filter($login);

        $stringLengthValidator = new Zend_Validate_StringLength(3, 50);
        $loginValidator = new Xend_Validate_Login();
        $response = new Xend_Response();
        if (!$stringLengthValidator->isValid($login) || !$loginValidator->isValid($login)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INPUT_PARAMS_INCORRECT, 'login'));
        }

        $count = $this->_tableAccounts->count(array('login = ?' => $login));
        $status = null;
        $exists = true;

        if (0 === $count) {
            $status = Xend_Accounts_Status::OK;
            $exists = false;
        } elseif (false === $count) {
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        } else {
            $status = Xend_Accounts_Status::ACCOUNT_IS_ALREADY_EXISTS;
        }

        $response->exists = $exists;
        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    /**
     * Delete account by id
     *
     * @param int $id
     * @return Xend_Response
     */
    public function deleteAccount($id)
    {
        $response = new Xend_Response();

        if ($this->isRemoteauthEnabled() && $this->isAdmin($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::ACCOUNT_IS_PROTECTED));
        }

        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        try {
            $affectedRows = $this->_tableAccounts->deleteByPk($id);
            $status = Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRows);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    /**
     * Change account password
     *
     * @param int $id           The account id
     * @param string $password  The account password
     * @return Xend_Response
     */
    public function changePassword($id, $password)
    {
        $response = new Xend_Response();

        if ($this->isRemoteauthEnabled() && $this->isAdmin($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::ACCOUNT_IS_PROTECTED));
        }

        $f = new Xend_Filter_Input(array(
            'id'    => 'int'
        ), array(
            'id'        => array('id', 'presense'   => 'required'),
            'password'  => array('password', 'presense' => 'required')
        ), array(
            'id'        => $id,
            'password'  => $password
        ));

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $affectedRow = $this->_tableAccounts->updateByPk(array(
            'password'  => md5($password),
        ), $id);

        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRow)));
    }

    /**
     * Change password
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

        if ($this->isRemoteauthEnabled() && $this->isAdmin($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::ACCOUNT_IS_PROTECTED));
        }

        $data['id'] = $id;

        $f = new Xend_Filter_Input(array(
            '*'     => array('StringTrim')
        ), array(
            'old_password'  => array('password', 'presense' => 'required'),
            'new_password1'  => array('password', 'presense' => 'required'),
            'new_password2'  => array('password', 'presense' => 'required')
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $password = $this->_tableAccounts->fetchPassword($id);

        if ($password !== md5($f->old_password)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::WRONG_PASSWORD, 'old_password'));
        }

        if ($f->new_password1 !== $f->new_password2) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INCORRECT_NEW_PASSWORD, 'new_password2'));
        }

        $affectedRows = $this->_tableAccounts->updateByPk(array(
            'password' => md5($f->new_password1)
        ), $id);

        $response->affectedRows = $affectedRows;
        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRows)));
    }

    /**
     * Retrieve account state
     *
     * @param int $id       The account id
     * @return Xend_Response
     */
    public function getState($id)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $row = $this->_tableAccounts->findOne($id);
        if (is_null($row)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::NO_ONE_ROWS_AFFECTED));
        }


        if (false !== ($state = @unserialize($row->state))) {
            $response->rows = $state;
            $status = Xend_Accounts_Status::OK;
        } else {
            $status = Xend_Accounts_Status::FAILURE;
        }
        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    /**
     * Update account state
     *
     * @param int $id           The account id
     * @param array $state      The state storage
     * @return Xend_Response
     */
    public function saveState($id, array $state = array())
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $affectedRows = $this->_tableAccounts->updateByPk(array(
            'state' => serialize($state)
        ), $id);

        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRows)));
    }

    /*********************** Private methods ******************************/

    /**
     * @param int $id
     * @return bool
     */
    private function isAdmin($id)
    {
        if (intval($id) < 1) {
            return false;
        }
        $row = $this->_tableAccounts->findOne(intval($id));
        if (!$row || is_null($row)) {
            return false;
        }
        return ($row->role_id == ADMIN_ROLE && $row->login == 'admin');
    }

    /**
     * @return bool
     */
    private function isRemoteauthEnabled()
    {
        $config = Zend_Registry::get('config');
        return ($config->remoteauth->enable == 1);
    }

    /**
     * @return int
     */
    private function getCount()
    {
        return $this->_tableAccounts->count();
    }
}