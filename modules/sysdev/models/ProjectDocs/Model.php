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
                array('id', 'name', 'project_id', 'date_create', 'account_id', 'url')
            )
            ->join(
                array('a' => 'accounts'),
                'a.id=d.account_id',
                array('author' => 'name')
            )
            ->order('d.date_create ASC');
        
        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);
        if (isset($params['project_id']) && !empty($params['project_id'])) {
            $params['project_id'] = intval($params['project_id']);
            if ($params['project_id']==0) {
                return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
            }
            $select->where('d.project_id=?',$params['project_id']);
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
}