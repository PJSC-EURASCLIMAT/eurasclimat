<?php

class Courses_Model
{
    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Courses_Table();
    }

    public function update(array $params)
    {
        $response = new Xend_Response();

        $data = Zend_Json::decode($params['data']);

        $f = new Xend_Filter_Input(array(
            'id'            => 'int',
            'name'          => 'StringTrim',
            'offer_num'     => 'StringTrim',
            'description'   => 'StringTrim',
            'group_id'      => 'int',
//            'price'         => 'decimal',
            'closed'        => 'int',
        ), array(
            'id'            => array('int', 'presence' => 'required'),
            'name'          => array('StringLength'),
            'offer_num'     => array('StringLength'),
            'description'   => array('StringLength'),
            'group_id'      => array('Id', 'allowEmpty' => true),
            'price'         => array('Float', 'locale' => 'de'),
            'closed'        => array('int'),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $rows = $this->_table->updateByPk($f->getData(), $f->id);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }


    public function add(array $params)
    {
        $response = new Xend_Response();

        $data = Zend_Json::decode($params['data']);

        $f = new Xend_Filter_Input(array(
            'name'          => 'StringTrim',
            'offer_num'     => 'StringTrim',
            'description'   => 'StringTrim',
            'group_id'      => 'int',
            'price'         => 'Digits',
            'closed'        => 'int',
        ), array(
            'name'          => array('StringLength'),
            'offer_num'     => array('StringLength'),
            'description'   => array('StringLength'),
            'group_id'      => array('Id', 'allowEmpty' => true),
            'price'         => array('Float', 'allowEmpty' => true),
            'closed'        => array('int'),
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

    public function delete(array $params)
    {
        $response = new Xend_Response();

        $data = Zend_Json::decode($params['data']);
        $id = intval($data['id']);

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

    public function get($id)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('c' => $this->_table->getTableName()),
                array( 'c.id', 'c.name', 'c.description', 'c.group_id', 'c.closed', 'c.offer_num', 'c.price')
            )
            ->joinLeft(
                array('t' => 'courses_groups'),
                't.id=c.group_id',
                array(
                     'group_name' => 't.text'
                )
            )
            ->where('c.id = ?', $id);


        try {
            $rowset = $select->query()->fetch();

            $response->setRowset($rowset);
            $response->total = 1;
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }


        return $response->addStatus(new Xend_Status($status));
    }


    public function getAll($where, $params = array())
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('c' => $this->_table->getTableName()),
                array( 'c.id', 'c.name', 'c.description', 'c.group_id', 'c.closed', 'c.offer_num', 'c.price')
            )
            ->joinLeft(
                array('t' => 'courses_groups'),
                't.id=c.group_id',
                array(
                    'group_name' => 't.text'
                )
            );

            if (isset($where)) {
                $select->where($where[0], $where[1]);
            }

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



}