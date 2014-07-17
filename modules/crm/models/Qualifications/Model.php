<?php

class Crm_Qualifications_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Qualifications_Table();
    }

    public function create(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'         => 'StringTrim'
        ), array(
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'type_id'   => array('Id', 'allowEmpty' => false),
            'num'     => array('Int', 'allowEmpty' => false),
        ), $data);

        $response->addInputStatus($f);

        if ( $response->hasNotSuccess() ) {
            return $response;
        }

        try {
            $this->_table->getAdapter()->query(
                'UPDATE qualifications SET num = num + 1 WHERE num >= ? AND type_id = ?',
                array($f->num, $f->type_id)
            );
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
                array('q' => $this->_table->getTableName()),
                array( 'q.id',
                       'q.name',
                       'q.type_id',
                       'q.num',
                )
            )
            ->joinLeft(
                array('t' => 'qualifications_types'),
                't.id=q.type_id',
                array('type_name' => 't.name')
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
            ->from(array('q' => $this->_table->getTableName()))
            ->joinLeft(
                array('t' => 'qualifications_types'),
                't.id=q.type_id',
                array(
                     'type_name' => 't.name'
                )
            )
            ->where("q.id = ?", $id);

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
            'id'        => array('Id', 'allowEmpty' => false),
            'name'      => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'type_id'   => array('Int', 'allowEmpty' => false),
            'num'     => array('Int', 'allowEmpty' => false),
        ), $data);

        $response->addInputStatus($f);

        if ($response->hasNotSuccess()) {
            return $response;
        }

        $num = $f->num;

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('q' => $this->_table->getTableName()),
                array('q.id')
            )
            ->where('q.num >= ?', $num)
            ->where('q.id != ?', $f->id)
            ->where('type_id', $f->type_id)
            ->order(array('num ASC'));

        $sortedIds = $select->query()->fetchAll();

        foreach( $sortedIds as $key => $value ) {
            $num++;
            $this->_table->updateByPk(array(
                'num'       => $num
            ), $value['id']);
        }

        $test = 0;

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