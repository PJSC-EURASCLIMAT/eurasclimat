<?php

class Crm_Contractors_ContactsModel
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Contractors_ContactsTable();
    }

    public function get($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(array('c' => $this->_table->getTableName()))
            ->where("c.id = ?", $id);

        try {
            $row = $select->query()->fetch();
            if ( empty( $row ) ) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }

            $response->setRow($row);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function create(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
        	'contractor_id' => array('Int', 'allowEmpty' => false),
        	'account_id' 	=> array('Int', 'allowEmpty' => true),
            'name'      	=> array(array('StringLength', 1, 255), 'allowEmpty' => false),
        	'work_phone'    => array(array('StringLength', 1, 255), 'allowEmpty' => true),
        	'mobile_phone'	=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
        	'email'      	=> array(array('StringLength', 1, 255), 'allowEmpty' => true)
        ), $data);

        $response->addInputStatus($f);

        if ( $response->hasNotSuccess() ) {
            return $response;
        }

        try {
            $response->id = $this->_table->insert($f->getData());
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status($status));
    }

    public function read($contractor_id)
    {
        $response = new Xend_Response();

    		$rows = $this->_getList($contractor_id);
    		if (false === $rows) {
    			return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
    		}
        $response->setRowset($rows);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function update(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'        	=> array('Id', 'allowEmpty' => false),
            'contractor_id' => array('Id', 'allowEmpty' => false),
        	'account_id' 	=> array('Int', 'allowEmpty' => true),
            'name'      	=> array(array('StringLength', 1, 255), 'allowEmpty' => false),
        	'work_phone'    => array(array('StringLength', 1, 255), 'allowEmpty' => true),
        	'mobile_phone'	=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
        	'email'      	=> array(array('StringLength', 1, 255), 'allowEmpty' => true)
        ), $data);

        $response->addInputStatus($f);

        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function destroy(array $data)
    {
        $id = intval($data['id']);

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
    
    public function _getList($contractor_id)
    {
        $select = $this->_table->getAdapter()->select()
            ->from(
                array('c' => $this->_table->getTableName())
            )
            ->where('contractor_id = (?)', $contractor_id);

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