<?php

class Sysdev_ProjectDiscussions_Model
{
    /**
     * The Project Discussions object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Sysdev_ProjectDiscussions_Table();
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
            '*'             => 'StringTrim'
        ), array(
            'mark_id'             => array('Id','allowEmpty' => false),
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

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}