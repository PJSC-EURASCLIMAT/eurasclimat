<?php

/**
 * Projects Controller conroller
 */
class Sysdev_ProjectsController extends Xend_Controller_Action
{

    /**
     * @var Sysdev_Projects_Model
     */
    protected $_model;
    
    public function init()
    {
        $this->_model = new Sysdev_Projects_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->projectdev);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-tree');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
    }

    public function getTreeAction()
    {
        $response = $this->_model->fetchBranch(0);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $rows = $response->getRowset();
            $this->view->assign(array('children' => $rows));
        } else {
            $this->_collectErrors($response);
        }
    }
    
    public function createAction()
    {

        $data = Zend_Json::decode($this->_getParam('data'));
        
        // если приходит массив, отказываемся выполнять операцию сразу на нескольких узлах
        if (!array_key_exists('leaf', $data)) {
            $this->view->success = false;
            return;
        }

        $treeRows = $this->_model->getPlain();

        $tree = new Xend_Tree($treeRows);

        $parentNode = $tree->findNodeById($data['parentId']); // значение parentId устанавливается автоматически Ext.data.TreeStore

        $addChildResponse = $this->_model->add($data['leaf']); // значение leaf устанавливается автоматически Ext.data.TreeStore

        $childId = $addChildResponse->getDataCollection()->toArray();
        $childId = $childId['id'];
        
        $rows = array(array(
            'id' => $childId,
            'parent_id' => null,
            'position' => null,
            'name' => $data['name'],
            'leaf' => $data['leaf']
        ));
        $subTree = new Xend_Tree($rows);
        $childNode = $subTree->findNodeById($childId);

        $tree->append($parentNode, array($childNode));

        $this->saveMenuTree($tree);

        $this->view->children = $childNode->toFlatArray();
        $this->view->success = true;

    }

    public function updateAction()
    {
        
        $data = Zend_Json::decode($this->_getParam('data'));
        
        $success = $this->_model->rename($data['id'], $data['name']);
        
        $this->view->success = true;

    }

    public function deleteAction()
    {
        
    }
    
    private function saveMenuTree(Xend_Tree $tree) 
    {
        
        foreach ($tree->toFlatArray() as $row) {

            $this->_model->update(
                $row['id'], 
                $row['parent_id'], 
                $row['position'], 
                $row['name'],
                $row['leaf']
            );
            
        }
        
    }

}
