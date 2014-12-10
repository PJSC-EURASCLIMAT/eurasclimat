<?php

class Crm_Contractors_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Contractors_Table();
    }

    public function create(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false)
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


    public function read($params = array())
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('c' => $this->_table->getTableName())
            );

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->total = $plugin->getTotalCount();
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status($status));
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

    public function update(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'        		=> array('Id', 'allowEmpty' => false),
            'name'      		=> array(array('StringLength', 1, 255), 'allowEmpty' => false),
        	'full_name'			=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'legal_address'		=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'postal_address'	=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'form_organization'	=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'ogrn'				=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'okved'				=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'okato'				=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'okpo'				=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'inn_kpp'			=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'bank_account'		=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'bank'				=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'bik'				=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'corr_account'		=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'general_director'	=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'chief_accountant'	=> array(array('StringLength', 1, 255), 'allowEmpty' => true),
			'phone'				=> array(array('StringLength', 1, 255), 'allowEmpty' => true)
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
}