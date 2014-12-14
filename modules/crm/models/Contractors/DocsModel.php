<?php

class Crm_Contractors_DocsModel
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Contractors_DocsTable();
        $this->_versions_table = new Crm_Contractors_DocsVersionsTable();
        $this->_versions_model = new Crm_Contractors_DocsVersionsModel();
    }

    public function getByItem($params)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
        ->from(
            array('d' => $this->_table->getTableName()),
            array(
                'd.id', 'd.name', 'd.item_id',
                'type_id' => 't.id',
                'type' => 't.name'
            )
        )
        ->joinLeft(
            array('t' => 'doc_types'),
            't.id=d.type_id', null
        );

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        if (isset($params['item_id']) && !empty($params['item_id'])) {
            $params['item_id'] = intval($params['item_id']);
            if ($params['item_id']==0) {
                return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'item_id'));
            }
            $select->where('d.item_id=?', $params['item_id']);
        }

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

    public function deleteAllByProjectId($project_id)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
        ->from(
            array('d' => $this->_table->getTableName()),
            array('d.id')
        )
        ->where('d.project_id=?', $project_id);

        try {
            $rows = $select->query()->fetchAll();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return array();
        }

        foreach ($rows as &$row) {
            $this->delete($row['id']);
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function update($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'id'        => 'int',
            'type_id'   => 'int',
            'name'      => 'StringTrim'
        ), array(
            'id'    => array('int', 'presence' => 'required'),
            'type_id'    => array('int', 'presence' => 'required'),
            'name'       => array('StringLength')
        ), $data);

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

        $f = new Xend_Filter_Input(array(
            'item_id'    => 'int',
            'name'          => 'StringTrim'
        ), array(
            'item_id'    => array('int', 'presence' => 'required'),
            'name'          => array('StringLength'),
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

    public function delete($id)
    {
        $id = intval($id);
        if ($id == 0) {
            $response = new Xend_Response();
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $response = $this->getById($id);
        if ($response->hasNotSuccess()) {
            return $response->addStatus(new Xend_Status(Xend_Status::DELETE_FAILED));
        }
        $data = $response->getRowSet();

        $delVersionsResponse = $this->_versions_model->deleteAllByDoc($data);
        if ($delVersionsResponse->hasNotSuccess()) {
            return $delVersionsResponse->addStatus(new Xend_Status(Xend_Status::DELETE_FAILED));
        }

        try {
            $res = $this->_table->deleteByPk($id);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Status($status));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function getById($id)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
        ->from(
            array('d' => $this->_table->getTableName()),
            array('doc_id' => 'd.id', 'd.name', 'd.item_id')
        )
        ->joinLeft(
            array('v' => $this->_versions_table->getTableName()),
            'v.doc_id=d.id',
            array('v.file_id')
        )
        ->joinLeft(
            array('f' => 'files'),
            'f.id=v.file_id',
            array('date_create' => 'f.date')
        )
        ->joinLeft(
            array('a' => 'accounts'),
            'a.id=f.account_id',
            array('author' => 'a.name')
        )
        ->where('d.id=(?)', $id)
        ->order('f.date DESC')
        ->limit(1);

//        echo $select->assemble();

        try {
            $rows = $select->query()->fetchAll();
            if(count($rows) == 0) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }
            $response->setRowset($rows[0]);
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