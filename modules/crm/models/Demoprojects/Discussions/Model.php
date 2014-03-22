<?php

class Crm_Demoprojects_Discussions_Model
{
    /**
     * The Project Discussions model
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Demoprojects_Discussions_Table();
    }

    public function getByProject ($projectId)
    {
        $response = new Xend_Response();
        $projectId = intval($projectId);

        if ($projectId == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('d'=>$this->_table->getTableName()),
                array('id', 'content','date_create', 'project_id')
            )
            ->join(
                array('a' => 'accounts'),
                'a.id=d.account_id',
                array('author' => 'name')
            )
            ->where('d.project_id=?', $projectId)
            ->order('d.date_create ASC');

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

    public function add(array $params)
    {
        $params['date_create'] = date('Y-m-d H:i:s', time());
        $params['account_id']  = Xend_Accounts_Prototype::getId();

        $f = new Xend_Filter_Input(array(
            'project_id'    => 'Int',
            'content'       => 'StringTrim'
        ), array(
            'account_id'          => array('Id', 'allowEmpty' => false),
            'project_id'          => array('Id', 'allowEmpty' => false),
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $this->_table->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $this->_sendMessage($f->project_id, $f->content);

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    private function _sendMessage($project_id, $message)
    {
        if (!class_exists('PA_Messages_Model')) return;

        $projectModel = new Crm_Demoprojects_Model();

        $response = $projectModel->get($project_id);
        if ($response->hasNotSuccess()) return;
        $projectInfo = $response->getRow();
        $receiver_id = intval($projectInfo['creator_id']);
        if (!$receiver_id > 0) return;

        $messageBody = 'Добавлен комментарий в модуль "Производственные проекты" к проекту "'
                     . $projectInfo['name'] . '":</p><p>' . $message . '</p>';


        $messagesModel = new PA_Messages_Model();
        $messagesModel->add(array(
            'sender_id'      => Xend_Accounts_Prototype::getId(),
            'receiver_id'    => $receiver_id,
            'message'        => $messageBody
        ));
    }
}