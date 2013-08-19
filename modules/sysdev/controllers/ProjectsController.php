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
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'rename');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'move');
    }

    public function getTreeAction()
    {
        
        // инициализация ответа
        $response = new Xend_Response();
        
        try {
            
            // извлекаем ветвь дерева
            $branch = $this->_model->fetchBranch();
            
        }
        catch(Exception $e) {

            // сообщаем о проблеме в общем виде
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            
        }

        // определяем параметры представления
        $this->view->success = true;
        $this->view->children = $branch['children'];
        
        // возвращаем ответ
        return $response->addStatus(new Xend_Status(Xend_Status::OK));

    }
    
    public function createAction()
    {

        // инициализация ответа
        $response = new Xend_Response();
        
        // получаем параметры запроса
        $data = Zend_Json::decode($this->_getParam('data'));
        
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
            $this->view->success = false;
            return $response;
            // в случае поломки синхронизации может приходить данные сразу нескольких новых узлов
        }
        
        $isLeaf = (bool)$data['leaf']; // определяется автоматически в ExtJs
        $parentId = (int)$data['parentId']; // определяется автоматически в ExtJs, для корневого узла - 0

        try {
            
            // создаём дочерний узел
            $childNode = $this->_model->add($parentId, $isLeaf);
            
        }
        catch(Exception $e) {

            // сообщаем о проблеме в общем виде
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            
        }


        // определяем параметры представления
        $this->view->children = $childNode;
        $this->view->success = true;
        
        // возвращаем ответ
        return $response->addStatus(new Xend_Status(Xend_Status::OK));

    }

    public function renameAction()
    {
        
        // инициализация ответа
        $response = new Xend_Response();
        
        // получаем параметры запроса
        $data = Zend_Json::decode($this->_getParam('data'));
        
        // проверяем параметры запроса на валидность
        $filter = new Xend_Filter_Input(array(
            'id'    => 'int'
        ), array(
            'id' => array('id', 'presense' => 'required')
        ), $data);
        $response->addInputStatus($filter);
        if ($response->hasNotSuccess()) {
            $this->view->success = false;
            return $response;
            // в случае поломки синхронизации может приходить данные сразу нескольких узлов
        }
        
        $id = (int)$data['id'];
        $name = (string)$data['name'];
        
        try {
            
            // переименовываем узел
            $this->_model->rename($id, $name);
            
        }
        catch (Exception $e) {
            
            // сообщаем о проблеме в общем виде
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            
        }
        
        // определяем параметры представления
        $this->view->success = true;
        
        // возвращаем ответ
        return $response->addStatus(new Xend_Status(Xend_Status::OK));

    }

    public function deleteAction()
    {

        // инициализация ответа
        $response = new Xend_Response();
        
        // получаем параметры запроса
        $data = Zend_Json::decode($this->_getParam('data'));
        
        // проверяем параметры запроса на валидность
        $filter = new Xend_Filter_Input(array(
            'id'    => 'int'
        ), array(
            'id' => array('id', 'presense' => 'required')
        ), $data);
        $response->addInputStatus($filter);
        if ($response->hasNotSuccess()) {
            $this->view->success = false;
            return $response;
            // в случае поломки синхронизации может приходить данные сразу нескольких узлов
        }
        
        $id = (int)$data['id'];
        
        try {

            // переименовываем узел
            $this->_model->delete($id);
            
        }
        catch (ProjectsWithSubprojectsCanNotBeDeleted $e) {
            
            // сообщаем о проблеме в общем виде
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            
        }
        catch (Sysdev_Projects_TopLevelProjectCanNotBeDeleted $e) {
            
            // сообщаем о проблеме в общем виде
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            
        }
        catch (Exception $e) {
            
            // сообщаем о проблеме в общем виде
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            
        }
        
        // определяем параметры представления
        $this->view->success = true;
        
        // возвращаем ответ
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
        
    }
    
    public function moveAction() {
        
        // инициализация ответа
        $response = new Xend_Response();

        // получаем параметры запроса
        $targetId = (int)$this->_getParam('targetId');
        $position = (string)$this->_getParam('position');
        $movedIds = (array)$this->_getParam('movedIds');
        foreach ($movedIds as $index => $movedId) {
            $movedIds[$index] = (int)$movedId;
        }

        // проверяем параметры запроса на валидность
        if (!in_array($position, array('before', 'after', 'append'))) {
            
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT));
            
        }
    
        try {
            
            // перемещаем узлы
            $this->_model->move($targetId, $movedIds, $position);

        }
        catch (Sysdev_Projects_TopLevelProjectCanNotBeDeleted $e) {
            
            // сообщаем о проблеме в общем виде
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            
        }
        catch (Exception $e) {
            
            // сообщаем о проблеме в общем виде
            $this->view->success = false;
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            
        }

        // определяем параметры представления
        $this->view->success = true;
        
        // возвращаем ответ
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
        
    }

}
