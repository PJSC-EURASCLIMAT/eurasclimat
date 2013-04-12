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
}