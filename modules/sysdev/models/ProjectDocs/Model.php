<?php

class Sysdev_ProjectDocs_Model
{
    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Sysdev_ProjectDocs_Table();
        $this->_versions_model = new Sysdev_ProjectDocsVersions_Model();
    }

    /**
     * Get project detail
     *
     * @return Xend_Response <code>
     *  rows: array(
     *
     *  );
     * </code>
     */
    public function getByProject($params)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('d' => $this->_table->getTableName()),
                array('d.id', 'd.name', 'd.project_id')
            )
            ->join(
                array('v' => 'main_sysdev_project_docs_versions'),
                'v.doc_id=d.id',
                null
            )
            ->join(
                array('f' => 'files'),
                'f.id=v.file_id',
                array(
                    'date_create' => new Zend_Db_Expr('max(f.date)')
//                    'path' => 'f.path',
                )
            )


            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=f.account_id',
                array('author' => 'a.name')
            )
            ->group('v.doc_id');
//            ->order('f.date ASC');

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        if (isset($params['project_id']) && !empty($params['project_id'])) {
            $params['project_id'] = intval($params['project_id']);
            if ($params['project_id']==0) {
                return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
            }
            $select->where('d.project_id=?', $params['project_id']);
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

    public function add($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'project_id'    => 'int',
//            'file_id'       => 'int',
            'name'          => 'StringTrim'
        ), array(
            'project_id'    => array('int', 'presence' => 'required'),
//            'file_id'       => array('int', 'presence' => 'required'),
            'name'          => array('StringLength'),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }


//        $data = $f->getData();
//        $data['account_id'] = Xend_Accounts_Prototype::getId();

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

//        $doc_id = $modResponse->__get('id');
        $versionData = array(
            'doc_id' => $id
        );

        $versionResponse = $this->_versions_model->add($versionData);
        if ($versionResponse->hasNotSuccess()) {
            return $versionResponse->addStatus(new Xend_Status(Xend_Status::FAILURE));
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

//        $file = new Xend_File();
//        $fileResponse = $file->deleteFile($data['file_id']);
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
                array('d.id', 'd.name', 'd.project_id')
            )
            ->join(
                array('v' => 'main_sysdev_project_docs_versions'),
                'v.doc_id=d.id',
                array('v.file_id')
            )
            ->join(
                array('f' => 'files'),
                'f.id=v.file_id',
                array(
                    'date_create' => 'f.date'//new Zend_Db_Expr('max(f.date)')
//                    'path' => 'f.path',
                )
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=f.account_id',
                array('author' => 'a.name')
            )
            ->where('d.id=?', $id)
            ->order('f.date DESC')
            ->limit(1);

//        echo $select->assemble();

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


//    public function getById($id)
//    {
//        $response = new Xend_Response();
//        $validate = new Xend_Validate_Id();
//        if (!$validate->isValid($id)) {
//            return $response->addStatus(new Xend_Status(
//                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
//        }
//
//        try {
//            $rowset = $this->_table->findOne($id);
//            $status = Xend_Status::OK;
//        } catch (Exception $e) {
//            if (DEBUG) {
//                throw $e;
//            }
//            $status = Xend_Status::DATABASE_ERROR;
//            return $response->addStatus(new Xend_Status($status));
//        }
//
//        if (!is_null($rowset)) {
//            $rowset = $rowset->toArray();
//        } elseif (empty($rowset)) {
//            return $response->addStatus(new Xend_Status(
//                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
//        }
//
//        $response->setRowset($rowset);
//        return $response->addStatus(new Xend_Status(Xend_Status::OK));
//    }
}