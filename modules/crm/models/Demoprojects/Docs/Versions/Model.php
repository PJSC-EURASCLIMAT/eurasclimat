<?php

class Crm_Demoprojects_Docs_Versions_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Demoprojects_Docs_Versions_Table();
    }

    public function add($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'doc_id'    => 'int'
        ), array(
            'doc_id'    => array('int', 'presence' => 'required')
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $fileUploader = new Xend_File();
        $fileResponse = $fileUploader->uploadFile();

        if ($fileResponse->hasNotSuccess()) {
            $this->_collectErrors($fileResponse);
            return;
        }

        $data['file_id'] = $fileResponse->__get('file_id');

        try {
            $id = $this->_table->insert($data);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $fileUploader->deleteFile($data['file_id']);
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));

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
    public function getByDoc($params)
    {

        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('d' => $this->_table->getTableName()),
                array('d.id', 'd.file_id')
            )
            ->join(
                array('f' => 'files'),
                'f.id=d.file_id',
                array(
                    'date_create' => 'f.date',
                    'file_name' => new Zend_Db_Expr("CONCAT(name,'.', SUBSTRING_INDEX(f.path,'.',-1))"),
                )
            )
            ->order('f.date ASC');

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        if (isset($params['doc_id']) && !empty($params['doc_id'])) {
            $params['doc_id'] = intval($params['doc_id']);
            if ($params['doc_id']==0) {
                return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'doc_id'));
            }
            $select->where('d.doc_id=?', $params['doc_id']);
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

    public function deleteAllByDoc($params)
    {
        $response = new Xend_Response();

        $versionsResponse = $this->getByDoc($params);
        if ($versionsResponse->hasNotSuccess()) {
            return $versionsResponse;
        }
        $rows = $versionsResponse->getRowset();

        foreach ($rows as &$row) {
            $this->delete($row);
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }



    public function delete($data)
    {
        $response = new Xend_Response();

        $id = intval($data['id']);
        if ($id == 0) {
            $response = new Xend_Response();
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $file = new Xend_File();
        $fileResponse = $file->deleteFile($data['file_id']);

        if ($fileResponse->hasNotSuccess()) {
            return $fileResponse->addStatus(new Xend_Status(Xend_Status::DELETE_FAILED));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }


    public function getById($id)
    {
        $response = new Xend_Response();
        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($id)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        try {
            $rowset = $this->_table->findOne($id);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Status($status));
        }

        if (!is_null($rowset)) {
            $rowset = $rowset->toArray();
        } elseif (empty($rowset)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}