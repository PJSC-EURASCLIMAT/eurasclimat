<?php

class Crm_Professions_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Professions_Table();
    }

    public function create(array $data)
    {

        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'name'              => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'kch'               => array('Int', 'allowEmpty' => true),
            'etks'              => array('Int', 'allowEmpty' => true),
            'okz'               => array('Int', 'allowEmpty' => true),
            'base_salary'       => array('Int', 'allowEmpty' => true),
            'eng_sys_id'        => array('Int', 'allowEmpty' => true),
            'qualification_id'  => array('Int', 'allowEmpty' => true),
            'factor'            => array('Float', 'allowEmpty' => true),
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


    public function get($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('p' => $this->_table->getTableName()),
                array( 'p.id',
                       'p.name',
                       'p.kch',
                       'p.etks',
                       'p.okz',
                       'p.base_salary',
                       'p.eng_sys_type_id',
                       'p.qualification_id',
                       'p.factor',
                )
            )
            ->joinLeft(
                array('eng' => 'engineering_system_types'),
                'eng.id=p.eng_sys_type_id',
                array('eng_sys_type_name' => 'eng.name')
            )
            ->joinLeft(
                array('q' => 'qualifications'),
                'q.id=p.qualification_id',
                array('qualification_name' => 'q.name')
            )
            ->where("p.id = ?", $id);

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


    public function read($params = array())
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('p' => $this->_table->getTableName()),
                array( 'p.id',
                       'p.name',
                       'p.kch',
                       'p.etks',
                       'p.okz',
                       'p.base_salary',
                       'p.eng_sys_type_id',
                       'p.qualification_id',
                       'p.factor',
                )
            )
            ->joinLeft(
                array('eng' => 'engineering_system_types'),
                'eng.id=p.eng_sys_type_id',
                array('eng_sys_type_name' => 'eng.name')
            )
            ->joinLeft(
                array('q' => 'qualifications'),
                'q.id=p.qualification_id',
                array('qualification_name' => 'q.name')
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

    public function update(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'id'       => array('Id', 'allowEmpty' => false),
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'kch'       => array('Int', 'allowEmpty' => true),
            'etks'      => array('Int', 'allowEmpty' => true),
            'okz'       => array('Int', 'allowEmpty' => true),
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