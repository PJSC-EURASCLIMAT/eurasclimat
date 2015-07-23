<?php

class Crm_Contractors_EngsysModel
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Contractors_EngsysTable();
    }

    public function getByContractorId($id)
    {
        $response = new Xend_Response();
    
        $select = $this->_table->getAdapter()->select()
        ->from(
            array('t1' => 'engineering_system_types'),
            array( 't1.id', 't1.name', new Zend_Db_Expr('IF(t2.contractor_id IS NULL,0,1) as checked'))
        )
        ->joinLeft(
            array('t2' => $this->_table->getTableName()),
            new Zend_Db_Expr('t2.engsystype_id = t1.id AND t2.contractor_id = ' . $id),
            array()
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
    
    public function add($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'contractor_id'   => 'int',
            'engsystype_id'   => 'int',
        ), array(
            'contractor_id'   => array('Id', 'allowEmpty' => false),
            'engsystype_id'   => array('Id', 'allowEmpty' => false),
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
            'contractor_id'   => 'int',
            'engsystype_id'   => 'int',
        ), array(
            'contractor_id'   => array('Id', 'allowEmpty' => false),
            'engsystype_id'   => array('Id', 'allowEmpty' => false),
        ), $data);

        $where  = new Zend_Db_Expr('contractor_id = ' . $f->contractor_id . ' AND engsystype_id = ' . $f->engsystype_id);

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

    public function _getList($id)
    {
        $select = $this->_table->getAdapter()->select()
        ->from(
                array('t1' => 'engineering_system_types'),
                array('t1.name')
        )
        ->joinLeft(
                array('t2' => $this->_table->getTableName()),
                new Zend_Db_Expr('t2.engsystype_id = t1.id AND t2.contractor_id = ' . $id),
                array()
        )
        ->where('t2.contractor_id = (?)', $id);
        
        try {
            $rows = $select->query()->fetchAll();
            return $rows;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return false;
        }
    }
}