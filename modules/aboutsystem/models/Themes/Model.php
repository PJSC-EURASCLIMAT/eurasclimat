<?php

class Aboutsystem_Themes_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Aboutsystem_Themes_Table();
    }

    /**
     * Fetch all tree nodes
     *
     * @return Xend_Response <code>
     *  rows: array(
     *      id: int
     *      text: string
     *      parent_id: int
     *  );
     * </code>
     */
    public function fetchBranch($node)
    {
        $response = new Xend_Response();
        $rowset = $this->_getChildren($node, false);
        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    /**
     * Fetch childrens of tree node
     *
     * @return Xend_Response <code>
     *  rows: array(
     *      id: int
     *      text: string
     *      parent_id: int
     *  );
     * </code>
     */
    private function _getChildren($id, $checked = false)
    {
        $where = $id > 0 ? array('parent_id = ?' => $id) : array('parent_id is NULL');
        $rowset = $this->_table->fetchAll($where)->toArray();
        foreach ($rowset as &$row) {
            if ($checked) {
                $row['checked'] = false;
            }
            $row['expanded'] = true;
//            $row['leaf'] = false;
            $row['iconCls'] = 'noicon';
            $row['children'] = $this->_getChildren($row['id'], $checked);
        }
        return $rowset;
    }
}