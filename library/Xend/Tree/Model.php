<?php

class Xend_Tree_Model
{
    protected $_table;

    public function __construct($table_name, $nullable_fields = array ())
    {
        $this->_table = new Xend_Tree_Table($table_name, $nullable_fields);
    }

    public function create(array $params)
    {
        $data = Zend_Json::decode($params['data']);
        $data['parent_id'] = $data['parentId'];

        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
//            'parent_id' => 'Int',
            'text'      => 'StringTrim'
        ), array(
//            'parent_id' => array('Id'),
            'text'      => array('StringLength')
        ), $data);

        if ( $f->parent_id == 'root') {
            $f->parent_id = new Zend_Db_Expr('NULL');
        }

        $response->addInputStatus($f);

        if ( $response->hasNotSuccess() ) {
            return $response;
        }

        try {
            $response->id = $this->_table->insert(array(
                'parent_id' => $f->parent_id,
                'text' => $f->text,
            ));
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status($status));
    }


    public function read($where, $params = array())
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from($this->_table->getTableName());

        if ( isset( $where ) ) {
            $select->where($where);
        }

        if ( isset( $params['node'] ) && $params['node'] != 'root' ) {
            $select->where('parent_id = ?', $params['node']);
        }
        if ( isset( $params['node'] ) && $params['node'] == 'root' ) {
            $select->where('parent_id IS ?', new Zend_Db_Expr('NULL'));
        }

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->valueRows = $plugin->getValueRows('id');
//            $response->total = $plugin->getTotalCount();
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status($status));
    }

    public function update(array $params)
    {

        // TODO нужно как-то проверить что parent_id - это cуществующий id или 'root'

        $data = Zend_Json::decode($params['data']);

        $data['parent_id'] = $data['parentId'];

        $f = new Xend_Filter_Input(array(
            'id'        => 'Int',
            'text'    => 'StringTrim'
        ), array(
            'id'        => array('Id', 'allowEmpty' => false, 'presence' => 'required'),
            'text'    => array(array('StringLength', 0, 255), 'allowEmpty' => false, 'presence' => 'required')
        ), $data);

        if ( $f->parent_id == 'root') {
            $f->parent_id = new Zend_Db_Expr('NULL');
        }

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk(array(
           'parent_id' => $f->parent_id,
           'text' => $f->text
        ), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function destroy(array $params)
    {
        $data = Zend_Json::decode($params['data']);

        $id = intval($data['id']);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        try {
            $response = $this->_table->deleteByPk($id);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            // TODO не нашел как по фен-шую вынуть код mysql ошибки
            if ( preg_match('/Integrity constraint violation: 1451/',$e->getMessage()) ) {
                $status = Xend_Status::DATABASE_CONSTRAINT_ERROR;
                return $response->addStatus(new Xend_Status($status));
            }
            if (DEBUG) {
                throw $e;
            }

            $status = Xend_Status::DATABASE_ERROR;
        }


        return $response->addStatus(new Xend_Status($status));
    }

}