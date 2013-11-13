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
                array('d'=>$this->_table->getTableName()),
                array('id', 'name', 'project_id', 'file_id', 'account_id')
            )
            ->join(
                array('a' => 'accounts'),
                'a.id=d.account_id',
                array('author' => 'name')
            )
            ->join(
                array('f' => 'files'),
                'f.id=d.file_id',
                array('date_create' => 'date')
            )
            ->order('f.date ASC');

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

    public function add($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'project_id'    => 'int',
            'file_id'       => 'int',
            'name'          => 'StringTrim'
        ), array(
            'project_id'    => array('int', 'presence' => 'required'),
            'file_id'       => array('int', 'presence' => 'required'),
            'name'          => array('StringLength'),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = $f->getData();
        $data['account_id'] = Xend_Accounts_Prototype::getId();

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
        $response = new Xend_Response();
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