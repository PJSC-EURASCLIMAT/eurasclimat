<?php

/**
 * General class for manipulate accounts
 */
class Experts_Statuses_Model
{
    /**
     * The accounts table
     *
     * @var Xend_Accounts_Table_Accounts
     */
    protected $_table;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->_table = new Experts_Statuses_Table();
    }

    public function getAll()
    {
        $response = new Xend_Response();

        try {
            $rows = $this->_table->fetchAll()->toArray();
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



    public function update($data)
    {
        $response = new Xend_Response();

        unset($data['date_create']);
        unset($data['date_update']);

        $f = new Xend_Filter_Input(array(
            'id'        => 'int',
            'name'      => 'StringTrim',
            'desc'      => 'StringTrim',
        ), array(
            'id'    => array('int', 'presence' => 'required'),
            'name'       => array('StringLength'),
            'desc'    => array('StringLength'),
        ), $data);



        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function add($data)
    {
        $response = new Xend_Response();

        unset($data['date_update']);
        unset($data['date_create']);

        $f = new Xend_Filter_Input(array(
            'name'      => 'StringTrim',
            'desc'      => 'StringTrim',
        ), array(
            'name'       => array('StringLength'),
            'desc'    => array('StringLength'),
        ), $data);

        $data['author_id'] = Xend_Accounts_Prototype::getId();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $id = $this->_table->insert($data);
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

    public function getById($id)
    {
        $response = new Xend_Response();

        try {
            $rowset = $this->_table->findOne($id);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Status($status));
        }

        if (!is_null($rowset)) {
            $rowset = $rowset->toArray();
        } elseif (empty($rowset)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));

    }

}