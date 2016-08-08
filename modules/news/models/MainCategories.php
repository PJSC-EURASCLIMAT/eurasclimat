<?php

class News_MainCategories
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new News_MainCategoriesTable();
    }

    public function getList($params)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('n' => $this->_table->getTableName()),
                array('id', 'name')
            );

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->totalCount = $plugin->getTotalCount();
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
            ->from(
                array('n' => $this->_table->getTableName()),
                array('id', 'name')
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

    public function update(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'id'    => 'int',
            'name'  => 'StringTrim',
        ), array(
            'id'    => array('Id'),
            'name'  => array(array('StringLength', 1, 255), 'allowEmpty' => false),
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


    public function add(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'name'         => 'StringTrim',
        ), array(
            'name'         => array(array('StringLength', 1, 255), 'allowEmpty' => false),
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

    public function delete(array $data)
    {
        $response = new Xend_Response();

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

}