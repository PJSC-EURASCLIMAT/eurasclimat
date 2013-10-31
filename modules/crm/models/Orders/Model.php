<?php

class CRM_Orders_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new CRM_Orders_Table();
    }

    public function add(array $data)
    {

        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'account_id'    => 'int',
            'category'      => 'int',
            'object'        => 'int',
            'area'          => 'int',
            'contacts'      => 'StringTrim',
            'info'          => 'StringTrim',
        ), array(
            'account_id' => array('int', 'presence' => 'required'),
            'contacts'   => array('StringLength'),
            'info'       => array('StringLength'),
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


}