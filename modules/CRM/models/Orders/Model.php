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
            'account_id'        => 'int',
            'category'      => 'int',
            'object'     => 'int',
            'area'     => 'int',
            'phone'     => 'int',
            'skype'     => 'StringTrim',
            'info'     => 'StringTrim',
        ), array(
            'account_id'        => array('presense' => 'required'),
            'name'      => array('StringLength', 'presense' => 'required'),
            'phone'      => array('StringLength'),
            'skype'      => array('StringLength'),
            'info'     => array('StringLength'),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $this->_table->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }


}