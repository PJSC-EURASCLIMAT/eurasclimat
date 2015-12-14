<?php

class Crm_Projects_Docs_Versions_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Projects_Docs_Versions_Table();
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
            $this->_sendMessage($f->doc_id);
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
    
    private function _sendMessage($doc_id)
    {
        if (!class_exists('PA_Messages_Model')) return;
    
        $docsModel = new Crm_Projects_Docs_Model();
        $response = $docsModel->getById($doc_id);
        if ($response->hasNotSuccess()) return;
        $docInfo = $response->getRow();
        
        $projectModel = new Crm_Projects_Model();

        $response = $projectModel->get($docInfo['project_id']);
        if ($response->hasNotSuccess()) return;
    
        // Fetch creator ID
        $projectInfo = $response->getRow();
        $creator_id = intval($projectInfo['creator_id']);
        if (!$creator_id > 0) return;
    
        $members = array($creator_id);
    
        // Fetch members IDs
        $membersModel = new Crm_Projects_Members_Model();
        $response = $membersModel->getListByProjectID($docInfo['project_id']);
        if ($response->hasNotSuccess()) return;
        $membersData = $response->getRowset();
         
        foreach ($membersData as $member) {
            $members[] = $member['account_id'];
        }
    
        $messageBody = 'В модуле "Производственные проекты", в проекте "'
                . $projectInfo['name'] . '" обновился/добавился документ по имени "' . $docInfo['name'] . '".';
    
        $messagesModel = new PA_Messages_Model();
        $messagesModel->sendMessage(array(
                'sender_id'      => Xend_Accounts_Prototype::getId(),
                'receiver_id'    => join(',', $members),
                'message'        => $messageBody
        ), true);
    }
}