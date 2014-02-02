<?php

class Experts_Experts2JobTypes_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Experts_Experts2JobTypes_Table();
    }

    public function add($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'expert_id'     => 'int',
            'job_type_id'   => 'int',
        ), array(
            'expert_id'     => array('Id', 'allowEmpty' => false),
            'job_type_id'   => array('Id', 'allowEmpty' => false),
        ), $data);

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
        return $response->addStatus(new Xend_Status($status));

    }

    public function delete($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'expert_id'     => 'int',
            'job_type_id'   => 'int',
        ), array(
            'expert_id'     => array('Id', 'allowEmpty' => false),
            'job_type_id'   => array('Id', 'allowEmpty' => false),
        ), $data);

        $where  = new Zend_Db_Expr('expert_id = '.$f->expert_id.' AND job_type_id = '.$f->job_type_id.'');

        try {
            $count = $this->_table->delete($where);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

}