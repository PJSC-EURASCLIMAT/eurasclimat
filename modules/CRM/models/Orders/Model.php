<?php

class CRM_Orders_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Catalog_Expendables_Table();
    }

//    public function add(array $params)
//    {
//        $f = new Xend_Filter_Input(array(
//            '*'             => 'StringTrim'
//        ), array(
//            'group_id'              => array('Id', 'allowEmpty' => true),
//            'mark_id'               => array('Id', 'allowEmpty' => true),
//            'marking'               => array(array('StringLength', 1, 255), 'allowEmpty' => false)
//        ), $params);
//
//        $response = new Xend_Response();
//
//        $response->addInputStatus($f);
//        if ($response->hasNotSuccess()) {
//            return $response;
//        }
//
//        $id = $this->_table->insert($f->getData());
//        if (!$id) {
//            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
//        }
//
//        $response->id = $id;
//        return $response->addStatus(new Xend_Status(Xend_Status::OK));
//    }


}