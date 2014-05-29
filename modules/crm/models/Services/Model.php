<?php

class Crm_Services_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Services_Table();
        $this->_chapTable = new Crm_Services_ChaptersTable();
    }


    public function create(array $data)
    {

        $data['parent_id'] = $data['parentId'];

        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'text'              => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'chapter_id'        => array('Id', 'allowEmpty' => true),
            'profession_id'     => array('Id', 'allowEmpty' => true),
            'eng_sys_type_id'   => array('Id', 'allowEmpty' => true),
            'norm_hours'        => array('Int', 'allowEmpty' => true),
            'min_rank'          => array('Int', 'allowEmpty' => true),
        ), $data);

        if ( $f->parent_id == 'root') {
            $f->parent_id = new Zend_Db_Expr('NULL');
        }

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

        $servSelect = $this->_table->getAdapter()->select()
            ->from(
                array('s' => $this->_table->getTableName()),
                array( 'service_id' => 's.id',
                       'id' => new Zend_Db_Expr("NULL"),
                       's.text',
                       'parent_id' => 's.chapter_id',
                       new Zend_Db_Expr('"true" AS leaf'),
                       's.profession_id',
                       's.eng_sys_type_id',
                       's.norm_hours',
                       's.min_rank',
                )
            )
            ->joinLeft(
                array('p' => 'professions'),
                'p.id=s.profession_id',
                array('profession_name' => 'p.name')
            )
            ->joinLeft(
                array('e' => 'engineering_system_types'),
                'e.id=s.profession_id',
                array('eng_sys_type_name' => 'e.name')
            );
        $chapSelect = $this->_table->getAdapter()->select()
            ->from(
                array('c' => 'services_chapters'),
                array( new Zend_Db_Expr("NULL"),
                       'c.id',
                       'c.text',
                       'c.parent_id',
                       new Zend_Db_Expr('"false" AS leaf'),
                       new Zend_Db_Expr("NULL"),
                       new Zend_Db_Expr("NULL"),
                       new Zend_Db_Expr("NULL"),
                       new Zend_Db_Expr("NULL"),
                       new Zend_Db_Expr("NULL"),
                       new Zend_Db_Expr("NULL"),
                )
            );

        if ( isset( $params['node'] ) && $params['node'] != 'root' ) {
            $servSelect->where('chapter_id = ?', $params['node']);
            $chapSelect->where('parent_id = ?', $params['node']);
        }
        if ( isset( $params['node'] ) && $params['node'] == 'root' ) {
            $servSelect->where('ISNULL(chapter_id)');
            $chapSelect->where('ISNULL(parent_id)');
        }

        $select = $this->_table->getAdapter()->select()
            ->union(array($servSelect, $chapSelect));

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

    public function update(array $data)
    {

//        $data = Zend_Json::decode($params['data']);

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

    public function destroy(array $data)
    {
        $id = intval($data['id']);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        try {
            $id = $this->_table->deleteByPk($id);
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