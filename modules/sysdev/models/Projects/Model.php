<?php

class Sysdev_Projects_Model
{
    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Sysdev_Projects_Table();
    }

    /**
     * Fetch all roles tree
     *
     * @return Xend_Response <code>
     *  rows: array(
     *      id: int
     *      name: string
     *      parent_id: int
     *  );
     * </code>
     */
    public function fetchBranch($node)
    {
        $response = new Xend_Response();
        $rowset = $this->_getChildren($node, false);
        $response->setRowset($rowset);
        return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
    }

    /**
     * Fetch childrens of tree node
     *
     * @return Xend_Response <code>
     *  rows: array(
     *      id: int
     *      name: string
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
    
    /**
     * Get project detail
     *
     * @return Xend_Response <code>
     *  rows: array(
     *      
     *  );
     * </code>
     */
    public function getInfo($id)
    {
        $response = new Xend_Response();

        $id = intval($id);
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }
        $select = $this->_table->getAdapter()->select()
            ->from(
                array('p'=>$this->_table->getTableName()), 
                array('name','description', 'date_plan_begin', 'date_plan_end', 'date_fact_end', 'budget', 
                    'date_create', 'date_discuss_begin', 'date_discuss_end', 'date_vote_begin', 'date_vote_end')
            )
            ->join(
                array('a' => 'accounts'),
                'p.account_id=a.id',
                array('author' => 'name')
            )
            ->where('p.id=?', $id)
            ->where('p.leaf = ?', 'true');    
        $row = $this->_table->getAdapter()->fetchRow($select);
        $response->setRow($row);
        return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
    }
    
    public function rename($id, $name) {
        
        $response = new Xend_Response();
        
        $f = new Xend_Filter_Input(array(
            'id'        => 'int',
            'name'      => 'StringTrim'
        ), array(
            'id'        => array('id', 'presense' => 'required'),
            'name'      => array('StringLength', 'presense' => 'required')
        ), array(
            'id' => $id,
            'name' => $name
        ));
        
        $affectedRow = $this->_table->updateByPk(array(
            'name'  => $name,
        ), $id);
        
        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRow)));
        
    }
    
    public function getPlain() {
        
        $rows = $this->_table->fetchAll()->toArray();
        
        foreach ($rows as $index => $row) {
            
            $rows[$index]['leaf'] = ($row['leaf'] == 'true');
            
        }
        
        return $rows;
        
    }
    
    public function add($leaf)
    {
        $response = new Xend_Response();

        try {
            $id = $this->_table->insert(array(
                'leaf' => (bool)$leaf
            ));
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(
                Xend_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
        
    }
    
    public function update($id, $parentId, $position, $name, $leaf) {
        
        $response = new Xend_Response();
        
        $leaf = ($leaf === true) ? 'true' : 'false';
        
        $f = new Xend_Filter_Input(array(
            'id'        => 'int',
            'parent_id' => 'int',
            'position'  => 'int',
            'name'      => 'StringTrim',
            'leaf'      => 'int'
        ), array(
            'id'        => array('id', 'presense' => 'required'),
            'parent_id' => array('id', 'presense' => 'required'),
            'position'  => array('id', 'presense' => 'required'),
            'name'      => array('StringLength', 'presense' => 'required'),
            'leaf'      => array('int', 'presense' => 'required')
        ), array(
            'id' => $id,
            'parent_id' => $parentId,
            'position'  => $position,
            'name'      => $name,
            'leaf'      => $leaf
        ));
        
        $affectedRow = $this->_table->updateByPk(array(
            'name'  => $name,
            'parent_id' => $parentId,
            'position'  => $position,
            'name'      => $name,
            'leaf'      => $leaf
        ), $id);

        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRow)));
        
    }
    
}