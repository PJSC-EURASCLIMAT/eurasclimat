<?php

class Sysdev_Projects_Model
{

    const PREPARATION_STAGE = 1;
    const EXECUTION_STAGE = 2;

    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    private $_possibleStages;

    public function __construct()
    {
        $this->_table = new Sysdev_Projects_Table();
        $this->_possibleStages = array(
            self::PREPARATION_STAGE,
            self::EXECUTION_STAGE
        );
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
                array('name',
                    'description',
                    'account_id',
                    'date_plan_begin',
                    'date_plan_end',
                    'date_fact_end',
                    'budget',
                    'date_create',
                    'date_discuss_begin',
                    'date_discuss_end',
                    'date_vote_begin',
                    'date_vote_end',
                    'stage'
                )
            )
            ->joinLeft(
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

    public function getFullDescription($id)
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
                array('full_desc')
            )
            ->where('p.id=?', $id)
            ->where('p.leaf = ?', 'true');
        $row = $this->_table->getAdapter()->fetchRow($select);
        $response->setRow($row);
        return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
    }

    public function saveInfo(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'id'                => 'int',
            'name'              => 'StringTrim',
            'parent_id'         => 'int',
            'account_id'        => 'int',
            'extended'          => 'int',
            'description'       => 'StringTrim',
            'date_plan_begin'   => 'StringTrim',
            'date_plan_end'     => 'StringTrim',
            'date_fact_end'     => 'StringTrim',
            'date_vote_begin'   => 'StringTrim',
            'date_vote_end'     => 'StringTrim',
            'date_discuss_begin'=> 'StringTrim',
            'date_discuss_end'  => 'StringTrim',
            'date_create'       => 'StringTrim',
            'leaf'              => 'boolean',
            'position'          => 'int',
            'budget'            => 'digits',
            'stage'             => 'int'
        ), array(
            'id' => array('int', 'presence' => 'required'),
            'date_plan_begin'     => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_plan_end'       => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_fact_end'       => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_vote_begin'     => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_vote_end'       => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_discuss_begin'  => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_discuss_end'    => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'noise_level_max'     => array(array('StringLength', 0, 19), 'allowEmpty' => true),
            'date_create'         => array(array('StringLength', 0, 19), 'allowEmpty' => true),
        ), $data);


        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $affectedRow = $this->_table->updateByPk($data, $data['id']);

        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRow)));

    }

    public function saveFullDescription(array $data)
    {
        $response = new Xend_Response();

        $f = new Xend_Filter_Input(array(
            'id'                => 'int',
            'full_desc'       => 'StringTrim',
        ), array(
            'id' => array('Id','allowEmpty' => false),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $affectedRow = $this->_table->updateByPk(array(
            'full_desc'=>$data['full_desc']
        ), $data['id']);

        return $response->addStatus(new Xend_Accounts_Status(
            Xend_Accounts_Status::retrieveAffectedRowStatus($affectedRow)));

    }

    /**
     *
     * @param array $data
     * @return Xend_Response
     */
    public function fetchBranch(array $data)
    {

        $response = new Xend_Response();

        if (array_key_exists('id', $data)) {
            $nodeId = $data['id'];
        } else {
            $nodeId = null;
        }

        if (!array_key_exists('stage', $data)) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

        if (!in_array($data['stage'], $this->_possibleStages)) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

        $stage = (int)$data['stage'];

        try {

            $result = $this->_fetchNodeBranch($stage, $nodeId);
            $children = array_key_exists('children', $result) ? $result['children'] : array();
            $response->setRowset($children);
            return $response->addStatus(new Xend_Status(Xend_Status::OK));

        } catch (Exception $e) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

    }

    /**
     *
     * @param int $stage
     * @param array $data
     * @return Xend_Response
     */
    public function add($stage, array $data)
    {

        $response = new Xend_Response();

        // проверяем параметры запроса на валидность

        if (!in_array($stage, $this->_possibleStages)) {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

        $filter = new Xend_Filter_Input(array(
            'parentId' => 'int',
            //'leaf'      => 'int'
        ), array(
            'parentId' => array('int', 'presence' => 'required'),
            //'leaf'      => array('int', 'presence' => 'required')
        ), $data);
        $response->addInputStatus($filter);
        if ($response->hasNotSuccess()) {
            return $response;
            // в случае поломки синхронизации может приходить данные сразу нескольких новых узлов
        }

        $isLeaf = (bool)$data['leaf']; // определяется автоматически в ExtJs
        $parentId = (int)$data['parentId']; // определяется автоматически в ExtJs, для корневого узла - 0


        try {

            $result = $this->_addNewNode($stage, $parentId, $isLeaf, $data);
            $response->setRowset($result);
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
    public function rename(array $data) {

        $response = new Xend_Response();

        $filter = new Xend_Filter_Input(array(
            'id'    => 'int'
        ), array(
            'id' => array('id', 'presence' => 'required')
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
            'id' => array('id', 'presence' => 'required')
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
            'id'        => array('id', 'presence' => 'required'),
            'parent_id' => array('id', 'presence' => 'required'),
            'position'  => array('id', 'presence' => 'required'),
            'name'      => array('StringLength', 'presence' => 'required'),
            'leaf'      => array('int', 'presence' => 'required')
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
     * @param int $stage
     * @param int|null $nodeId
     * @return array
     */
    private function _fetchNodeBranch($stage, $nodeId = null)
    {

        $tree = $this->_fetchTree($stage);

        return $tree->findNodeById($nodeId)->toArray();

    }

    /**
     * добавляет новый узел
     * @param int $stage
     * @param int $parentId
     * @param bool $isLeaf
     * @return array
     */
    private function _addNewNode($stage, $parentId, $isLeaf, $data)
    {

        $tree = $this->_fetchTree($stage);

        $parentNode = $tree->findNodeById($parentId);

        $childId = $this->_table->insert(array(
            'leaf' => $isLeaf,
            'stage' => $stage
        ));

        $rows = array(array(
            'id' => $childId,
            'parent_id' => null,
            'account_id' => $data['account_id'],
            'position' => null,
            'name' => '',
            'leaf' => $isLeaf,
            'stage' => $stage
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
     * Меняет стадию проекта
     * @param array $data
     * @return Xend_Response
     */
    public function changeStage(array $data) {

        $response = new Xend_Response();

        $filter = new Xend_Filter_Input(array(
            'id'    => 'int'
        ), array(
            'id' => array('id', 'presence' => 'required')
        ), $data);
        $response->addInputStatus($filter);
        if ($response->hasNotSuccess()) {
            return $response;
            // в случае поломки синхронизации может приходить данные сразу нескольких узлов
        }

        $id = (int)$data['id'];
        $stage = (int)$data['stage'];

        try {
            $affectedRow = $this->_table->updateByPk(array(
                'stage'  => $stage,
                'parent_id'  => new Zend_Db_Expr('NULL'),
            ), $id);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
        }

        return $response->addStatus(new Xend_Status(
            Xend_Status::retrieveAffectedRowStatus($affectedRow)));
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

//        $depth = $tree->getDepth($removedNode);
//        if ($depth <= 1) {
//            throw new Sysdev_Projects_TopLevelProjectCanNotBeDeleted();
//        }

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

//            if ($depth <= 1) {
//                throw new Sysdev_Projects_TopLevelProjectCanNotBeMoved();
//            }

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
     * @param int $stage
     * @return \Xend_Tree
     */
    private function _fetchTree($stage = false)
    {

        $where = (false !== $stage)
            ? array('stage = (?)' => $stage)
            : array();
//        $rows = $this->_table->fetchAll($where)->toArray();
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
                'account_id' => $row['account_id'],
                'position'  => $row['position'],
                'leaf'      => $row['leaf'] ? 'true' : 'false' // поскольку значение в базе хранится в виде строки
            ), $row['id']);

        }

    }

}