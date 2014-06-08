<?php
/**
 * Created by JetBrains PhpStorm.
 * User: andrew
 * Date: 03.09.13
 * Time: 21:52
 * To change this template use File | Settings | File Templates.
 */

class Xend_Accounts_Model_AuthKeys {

    /**
     * The auth keys table
     *
     * @var Xend_Accounts_Table_AuthKeys
     */
    protected $_tableAuthKeys;


    /**
     * Constructor
     *
     */
    public function __construct()
    {
        $this->_tableAuthKeys = new Xend_Accounts_Table_AuthKeys();
    }

    /**
     * return password for set account id
     *
     * @param  int $id
     * @return string
     */
    public function getUserIdByKey($hash)
    {
        $response = new Xend_Response();
        $select = $this->_tableAuthKeys->getDefaultAdapter()->select()
            ->from($this->_tableAuthKeys->getTableName(),'user_id')
            ->where("hash = ?", new Zend_Db_Expr("'".$hash."'"))
            ->limit(1);

        // Массив массивов

        try {
            $user_id = $select->query()->fetchColumn(0);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        if (false === $user_id) {
            $status = Xend_Accounts_Status::HASH_NOT_FOUND;
        }
        $response->addData('user_id', $user_id);

        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    public function deleteByUserId($user_id)
    {
        $response = new Xend_Response();

        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($user_id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INPUT_PARAMS_INCORRECT, 'user_id'));
        }

        try {
            $affectedRows = $this->_tableAuthKeys->delete(array('user_id = ?' => $user_id));
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    public function insertKey($user_id)
    {
        $response = new Xend_Response();

        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($user_id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INPUT_PARAMS_INCORRECT, 'user_id'));
        }

        //генерим ключ
        $hash = md5(uniqid(rand(), true));


        try {
            $this->_tableAuthKeys->insert(array('user_id' => $user_id, 'hash' => $hash));
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        $response->addData('hash', $hash);

        return $response->addStatus(new Xend_Accounts_Status($status));

    }


}