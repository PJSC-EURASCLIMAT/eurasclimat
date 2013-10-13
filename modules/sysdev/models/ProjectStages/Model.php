<?php

class Sysdev_ProjectStages_Model
{
    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Sysdev_ProjectStages_Table();
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
                array('s'=>$this->_table->getTableName()),
                array('id', 'index', 'name','date_plan_begin', 'date_plan_end', 'date_fact_begin', 'date_fact_end',
                    'project_id', 'date_create', 'account_id')
            )
            ->join(
                array('a' => 'accounts'),
                'a.id=s.account_id',
                array('author' => 'name')
            )
            ->order('s.index ASC');

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        if (isset($params['project_id']) && !empty($params['project_id'])) {
            $params['project_id'] = intval($params['project_id']);
            if ($params['project_id']==0) {
                return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
            }
            $select->where('s.project_id=?',$params['project_id']);
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

    public function getChartByProject ($projectId)
    {
        $response = new Xend_Response();
        $projectId = intval($projectId);

        if ($projectId == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
        }

        $fakeFactFinish = new Zend_Db_Expr("'' as date_fact_finish");
        $fakePlanFinish = new Zend_Db_Expr("'' as date_plan_finish");
        $fakeNameFinish = new Zend_Db_Expr("'' as finish_display");
        $select = $this->_table->getAdapter()->select()
            ->from(
                array('s'=>$this->_table->getTableName()),
                array('id', 'name', 'date_plan_end', 'date_fact_end', 'project_id',
                    'index', $fakeFactFinish, $fakeFactFinish, $fakeNameFinish)
            )
            ->where('s.project_id=?', $projectId);

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


    public function saveInfo(array $data)
    {

        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'id'                => 'int',
            'account_id'        => 'int',
            'project_id'        => 'int',
            'index'             => 'int',
            'name'              => 'StringTrim',
            'date_plan_begin'   => 'StringTrim',
            'date_plan_end'     => 'StringTrim',
            'date_fact_begin'   => 'StringTrim',
            'date_fact_end'     => 'StringTrim',
            'date_create'       => 'StringTrim',
        ), array(
            'id'                => array('Id', 'presence' => 'required'),
            'project_id'        => array('Id', 'presence' => 'required'),
            'account_id'        => array('Id', 'presence' => 'required'),
            'name'              => array('StringLength', 'presence' => 'required'),
            'date_plan_begin'   => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_plan_end'     => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_fact_begin'   => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_fact_end'     => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_create'       => array(array('StringLength', 0, 19), 'allowEmpty' => true),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $affectedRow = $this->_table->updateByPk($data, $data['id']);

        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRow)));

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



    public function add($data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'name'              => 'StringTrim',
            'date_plan_begin'   => 'StringTrim',
            'date_plan_end'     => 'StringTrim',
            'date_fact_begin'   => 'StringTrim',
            'date_fact_end'     => 'StringTrim',
            'date_create'       => 'StringTrim',
            'account_id'        => 'int',
            'project_id'        => 'int',
            'index'             => 'int',
        ), array(
            'project_id'        => array('Id', 'presence' => 'required'),
            'account_id'        => array('Id', 'presence' => 'required'),
            'name'              => array('StringLength', 'presence' => 'required'),
            'date_plan_begin'   => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_plan_end'     => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_fact_begin'   => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_fact_end'     => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_create'       => array(array('StringLength', 0, 19), 'allowEmpty' => true),
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

}