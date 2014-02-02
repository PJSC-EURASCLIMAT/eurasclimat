<?php

class Experts_ExpertsJobTypes_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Experts_ExpertsJobTypes_Table();
    }

    public function getByExpertId($id)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('t' => $this->_table->getTableName()),
                array( 't.id', 't.name', new Zend_Db_Expr('IF(e2t.expert_id IS NULL,0,1) as checked'))
            )
            ->joinLeft(
                array('e2t' => 'experts2job_types'),
                new Zend_Db_Expr('e2t.job_type_id = t.id AND e2t.expert_id = '.$id.''),
                array()
            );

//        $resultTest = $select->assemble();

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
}