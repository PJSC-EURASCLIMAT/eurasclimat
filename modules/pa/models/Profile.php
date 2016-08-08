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
        $this->_expertsDocsModel = new Experts_ExpertsDocs_Model();
        $this->_expertsJBModel = new Experts_ExpertsJobTypes_Model();

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
                array( 'a.id', 'a.login', 'a.name', 'a.active', 'a.lang', 'a.tz', 'a.ukkom')
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
                    'expert_id' => 'ex.id',
                    'expert_status_id' => 'ex.status_id',
                    'expert_equip_id' => 'ex.equip_id',
                    'expert_desc' => 'ex.desc',
                    'expert_rating' => 'ex.rating',
                    'expert_work_years' => 'ex.work_years',
                    'expert_study_years' => 'ex.study_years',
                    'expert_sert_count' => 'ex.sert_count',
                )
            )
            ->joinLeft(
                array('st' => 'experts_statuses'),
                'st.id=ex.status_id',
                array('expert_status' => 'st.name')
            )
            ->joinLeft(
                array('eq' => 'experts_equipment'),
                'eq.id=ex.equip_id',
                array('expert_equipment' => 'eq.name')
            )
            ->where("a.id = ?", $accountId);
//            ->limit(1);

        try {
            $rowset = $select->query()->fetch();
            if(empty($rowset)) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }

            $rowset['expert_docs'] = array();

            $rowset['expert_info'] = array(
                'id'         => $rowset['expert_id'],
                'status_id'  => $rowset['expert_status_id'],
                'status'     => $rowset['expert_status'],
                'equip_id'   => $rowset['expert_equip_id'],
                'equipment'  => $rowset['expert_equipment'],
                'desc'       => $rowset['expert_desc'],
                'rating'     => $rowset['expert_rating'],
                'work_years' => $rowset['expert_work_years'],
                'study_years'=> $rowset['expert_study_years'],
                'sert_count' => $rowset['expert_sert_count'],
            );



            if($rowset['expert_id'] != null) {
                $expertDocsResponse = $this->_expertsDocsModel->getByExpert($rowset['expert_id']);
                $rowset['expert_docs'] = $expertDocsResponse->rowset;

                $jbResponse = $this->_expertsJBModel->getCheckedByExpertId($rowset['expert_info']['id']);
                if ($jbResponse->isError()) {
                    return $response->addStatus(new Xend_Accounts_Status(Xend_Accounts_Status::FAILURE));
                }
                $rowset['job_types'] = $jbResponse->getRowSet();
            }

            $response->setRowset($rowset);
//            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }

        // Документы аккаунта

        $rolesAccountsTable = new Xend_Acl_Table_RolesAccounts();
        $rowset['roles'] = $rolesAccountsTable->getRoles($accountId);

        $avatar_path = IMAGES_DIR . DIRECTORY_SEPARATOR . 'users' . DIRECTORY_SEPARATOR . $rowset['id'] . '.jpg';

        $rowset['have_avatar'] = (file_exists($avatar_path)) ? 1 : 0;

        $response->rowset = $rowset;
        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Accounts_Status(Xend_Accounts_Status::OK));
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
            'name'      => 'StringTrim',
            'login'     => 'StringTrim',
            'tz'        => 'int',
            'city_id'     => 'int',
        ), array(
            'id'        => array('id', 'presence' => 'required'),
            'name'      => array('StringLength'),
            'login'     => array('EmailAddress'),
            'tz'        => array('int', 'presence' => 'required', 'allowEmpty' => true),
            'city_id'   => array('int', 'presence' => 'required', 'allowEmpty' => true),
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