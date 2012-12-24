<?php

class News_Main
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new News_MainTable();
    }

    public function getList($params)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('n' => $this->_table->getTableName()),
                array('id', 'date', 'category_id', 'account_id', 'title', 'short_text')
            )
            ->join(
                array('a' => 'accounts'),
                'n.account_id=a.id',
                array('author' => 'name')
            )
            ->join(
                array('c' => 'news_main_category'),
                'n.category_id=c.id',
                array('category' => 'name')
            )
            ;

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

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

    /*
    public function get($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $row = $this->_table->findOne($id);
        if (!$row) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }
        $response->setRow($row->toArray());
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
    */

}