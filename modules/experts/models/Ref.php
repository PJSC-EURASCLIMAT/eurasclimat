<?php

/**
 * General class for manipulate accounts
 */
class Experts_Ref
{
    /**
     * The accounts table
     *
     * @var Xend_Accounts_Table_Accounts
     */
    protected $_table;

    protected $_select_fields;

    protected $_filter;

    /**
     * Constructor
     */
    public function __construct($table_name)
    {
        $this->_select_fields = array('id', 'name');

        $this->_filter = array(array(
//            'id'        => 'int',
            'name'      => 'StringTrim',
        ), array(

            'name'       => array('StringLength'),
        ));
        $this->_table = new Experts_RefTable($table_name, $this->_select_fields);

        switch($table_name){
            case 'statuses':
//                $this->_table = new Experts_RefTable();
                array_push($this->_select_fields,'desc');
                array_push($this->_filter[0],array('desc' => 'StringTrim'));
                array_push($this->_filter[1],array('desc' => array('StringLength')));
                break;
        }

    }

    public function getAll()
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array($this->_table->getTableName()),
                $this->_select_fields
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

    public function update($data)
    {
        $response = new Xend_Response();

        unset($data['date_create']);
        unset($data['date_update']);

        $filter = $this->_filter;
        $filter[0]['id'] = 'int';
        $filter[1]['id'] = array('int', 'presence' => 'required');

        $f = new Xend_Filter_Input($filter[0],$filter[1], $data);

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
        unset($data['author_id']);

        $filter = $this->_filter;
//        foreach($filter as $key=>$val){
//            array_splice($val,1,0);
//        }


        $f = new Xend_Filter_Input($filter[0],$filter[1], $data);

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
        return $response->addStatus(new Xend_Status($status));

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
        return $response->addStatus(new Xend_Status($status));

    }

}