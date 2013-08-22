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
     *
     * @param int $nodeId
     * @return Xend_Response
     */
    public function fetchBranch($nodeId = null)
    {

        $response = new Xend_Response();

        try {

            $data = $this->_fetchNodeBranch($nodeId);
            $response->setRowset($data['children']);
            return $response->addStatus(new Xend_Status(Xend_Status::OK));

        } catch (Exception $e) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }
        
    }

    /**
     *
     * @param array $data
     * @return Xend_Response
     */
    public function add(array $data) 
    {

        $response = new Xend_Response();
        
        // проверяем параметры запроса на валидность
        $filter = new Xend_Filter_Input(array(
            'parentId' => 'int',
            //'leaf'      => 'int'
        ), array(
            'parentId' => array('int', 'presense' => 'required'),
            //'leaf'      => array('int', 'presense' => 'required')
        ), $data);
        $response->addInputStatus($filter);
        if ($response->hasNotSuccess()) {
            return $response;
            // в случае поломки синхронизации может приходить данные сразу нескольких новых узлов
        }
        
        $isLeaf = (bool)$data['leaf']; // определяется автоматически в ExtJs
        $parentId = (int)$data['parentId']; // определяется автоматически в ExtJs, для корневого узла - 0


        try {

            $data = $this->_addNewNode($parentId, $isLeaf);
            $response->setRowset($data);
            return $response->addStatus(new Xend_Status(Xend_Status::OK));

        } catch (Exception $e) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

    }

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

    /**
     *
     * @param array $data
     * @return Xend_Response
     */
    public function rename(array $data) {

        $response = new Xend_Response();

        $filter = new Xend_Filter_Input(array(
            'id'    => 'int'
        ), array(
            'id' => array('id', 'presense' => 'required')
        ), $data);
        $response->addInputStatus($filter);
        if ($response->hasNotSuccess()) {
            return $response;
            // в случае поломки синхронизации может приходить данные сразу нескольких узлов
        }
        
        $id = (int)$data['id'];
        $name = (string)$data['name'];
        
        try {

            $this->_renameNode($id, $name);
            return $response->addStatus(new Xend_Status(Xend_Status::OK));

        } catch (Exception $e) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

    }

    /**
     *
     * @param array $data
     * @return Xend_Response
     */
    public function delete(array $data) {

        $response = new Xend_Response();
        
        $filter = new Xend_Filter_Input(array(
            'id'    => 'int'
        ), array(
            'id' => array('id', 'presense' => 'required')
        ), $data);
        $response->addInputStatus($filter);
        if ($response->hasNotSuccess()) {
            return $response;
            // в случае поломки синхронизации может приходить данные сразу нескольких узлов
        }
        
        $id = (int)$data['id'];
        
        try {

            $this->_deleteNode($id);
            return $response->addStatus(new Xend_Status(Xend_Status::OK));

        } catch (Exception $e) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

    }

    /**
     *
     * @param array $data
     * @return Xend_Response
     */
    public function move(array $data) {

        $response = new Xend_Response();
        
        $targetId = (int)$data['targetId'];
        $position = (string)$data['position'];
        $movedIds = (array)$data['movedIds'];
        foreach ($movedIds as $index => $movedId) {
            $movedIds[$index] = (int)$movedId;
        }

        // проверяем параметры запроса на валидность
        if (!in_array($position, array('before', 'after', 'append'))) {
            
            return $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT));
            
        }
        
        try {

            $this->_moveNode($targetId, $movedIds, $position);
            return $response->addStatus(new Xend_Status(Xend_Status::OK));

        } catch (Exception $e) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }
        
    }

    private function update_OldVersion($id, $parentId, $position, $name, $leaf) {

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


    
    
    
    
    /**
     * извлекает ветку
     * @param int $nodeId
     * @return array
     */
    private function _fetchNodeBranch($nodeId = null)
    {
        
        $tree = $this->_fetchTree();
        
        return $tree->findNodeById($nodeId)->toArray();

    }
    
    /**
     * добавляет новый узел
     * @param int $parentId
     * @param bool $isLeaf
     * @return array
     */
    private function _addNewNode($parentId, $isLeaf) 
    {
        
        $tree = $this->_fetchTree();

        $parentNode = $tree->findNodeById($parentId);

        $childId = $this->_table->insert(array(
            'leaf' => $isLeaf
        ));

        $rows = array(array(
            'id' => $childId,
            'parent_id' => null,
            'position' => null,
            'name' => '',
            'leaf' => $isLeaf
        ));
        $subTree = new Xend_Tree($rows); // передача параметра по ссылке
        $childNode = $subTree->findNodeById($childId);

        $tree->append($parentNode, array($childNode));

        $this->_saveTree($tree);

        return $childNode->toFlatArray();
        
    }
    
    /**
     * переименовывает узел
     * @param int $id
     * @param str $name
     */
    public function _renameNode($id, $name) 
    {

        $affectedRow = $this->_table->updateByPk(array(
            'name'  => $name,
        ), $id);

    }
    
    /**
     * удаляет узел дерева
     * @param int $id
     * @return void
     */
    public function _deleteNode($id) 
    {

        $tree = $this->_fetchTree();

        $removedNode = $tree->findNodeById($id);

        if ($removedNode->hasChildren()) {
            throw new  ProjectsWithSubprojectsCanNotBeDeleted();
        }

        $depth = $tree->getDepth($removedNode);
        if ($depth <= 1) {
            throw new Sysdev_Projects_TopLevelProjectCanNotBeDeleted();
        }

        $removedNodeIds = $tree->removeNode($removedNode);

        foreach ($removedNodeIds as $removedNodeId) {

            $this->_table->delete('id = '.$removedNodeId);

        }

        $this->_saveTree($tree);

    }
    
    /**
     * перемещает узлы по дереву
     * @param integer $targetId
     * @param integer[] $movedIds
     * @param string $position "before", "after" или "append"
     */
    public function _moveNode($targetId, array $movedIds, $position) 
    {

        $tree = $this->_fetchTree();

        $targetNode = $tree->findNodeById($targetId);

        $movedNodes = array();

        foreach ($movedIds as $movedId) {

            $movedNode = $tree->findNodeById($movedId);

            $depth = $tree->getDepth($movedNode);

            if ($depth <= 1) {
                throw new Sysdev_Projects_TopLevelProjectCanNotBeMoved();
            }

            $movedNodes[] = $movedNode;

        }

        foreach ($movedNodes as $movedNode) {

            $tree->removeNode($movedNode);

        }

        switch ($position) {
            case 'before':
                $tree->insertBefore($targetNode, $movedNodes);
                break;
            case 'after':
                $tree->insertAfter($targetNode, $movedNodes);
                break;
            case 'append':
                $tree->append($targetNode, $movedNodes);
                break;
            default:
                throw new Exception('Неизвестное расположение: ' . $position);
                break;
        }

        $this->_saveTree($tree);

    }

    /**
     * извлекает всё дерево или его часть
     * @param int $nodeId
     * @return \Xend_Tree
     */
    private function _fetchTree($nodeId = null)
    {

        $rows = $this->_table->fetchAll()->toArray();

        foreach ($rows as $index => $row) {

            $rows[$index]['leaf'] = ($row['leaf'] == 'true'); // поскольку значение в базе хранится в виде строки
            $rows[$index]['expanded'] = true; // раскрываем все уровни
        }

        $tree = new Xend_Tree($rows);

        return $tree;

    }

    /**
     * сохраняет все узлы дерева
     * @param Xend_Tree $tree
     */
    private function _saveTree(Xend_Tree $tree)
    {

        foreach ($tree->toFlatArray() as $row) {

            $this->_table->updateByPk(array(
                'name'  => $row['name'],
                'parent_id' => $row['parent_id'],
                'position'  => $row['position'],
                'leaf'      => $row['leaf'] ? 'true' : 'false' // поскольку значение в базе хранится в виде строки
            ), $row['id']);

        }

    }
    
}