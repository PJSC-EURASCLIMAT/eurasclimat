<?php

class Crm_CalcpdConfigController extends Xend_Controller_Action
{

    /**
     * @var model
     */
    protected $_model;

    public function init()
    {
        $this->_model = new Crm_Calcpd_ConfigModel();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->projects);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'info');
        
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->calcpd->admin);

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-obj-tree');

        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-price');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'set-price');

        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create-serv');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read-serv');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-serv');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy-serv');

        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create-obj-type');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read-obj-type');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-obj-type');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy-obj-type');

        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'create-obj-class');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'read-obj-class');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-obj-class');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'destroy-obj-class');
    }
    
    public function infoAction()
    {
    	$response = $this->_model->info();
    	if ($response->isSuccess()) {
    		$this->view->success = true;
    		$this->view->data = $response->getRowset();
    	} else {
    		$this->_collectErrors($response);
    	}
    }
    
    public function getObjTreeAction()
    {
        $response = $this->_model->getObjTree();
        if ($response->isSuccess()) {
            $this->view->success = true;
            $rows = $response->getRowset();
            $this->view->assign(array('children' => $rows));
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getPriceAction()
    {
        $response = $this->_model->getPrice(
            $this->_getParam('obj_type_id'),
            $this->_getParam('obj_class_id'),
            $this->_getParam('serv_id')
        );
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRow();
        } else {
            $this->_collectErrors($response);
        }
    }

    public function setPriceAction()
    {
        $response = $this->_model->setPrice($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }

    /* serv section */

    public function createServAction()
    {
        $this->_create('calcpd_serv', $this->_getParam('data'));
    }

    public function readServAction()
    {
        $this->_read('calcpd_serv');
    }

    public function updateServAction()
    {
        $this->_update('calcpd_serv', $this->_getParam('data'));
    }

    public function destroyServAction()
    {
        $this->_destroy('calcpd_serv', $this->_getParam('data'));
    }


    /* obj-type section */

    public function createObjTypeAction()
    {
        $this->_create('calcpd_obj_type', $this->_getParam('data'));
    }

    public function readObjTypeAction()
    {
        $this->_read('calcpd_obj_type');
    }

    public function updateObjTypeAction()
    {
        $this->_update('calcpd_obj_type', $this->_getParam('data'));
    }

    public function destroyObjTypeAction()
    {
        $this->_destroy('calcpd_obj_type', $this->_getParam('data'));
    }


    /* obj_class section */

    public function createObjClassAction()
    {
        $this->_create('calcpd_obj_class', $this->_getParam('data'));
    }

    public function readObjClassAction()
    {
        $this->_read('calcpd_obj_class');
    }

    public function updateObjClassAction()
    {
        $this->_update('calcpd_obj_class', $this->_getParam('data'));
    }

    public function destroyObjClassAction()
    {
        $this->_destroy('calcpd_obj_class', $this->_getParam('data'));
    }


    /*
     * Abstract routine
     *
     */

    private function _create($table, $data)
    {
        $response = $this->_model->create($table, $data);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    private function _read($table)
    {
        $response = $this->_model->read($table);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
            $this->_collectErrors($response);
        }
    }

    private function _update($table, $data)
    {
        $response = $this->_model->update($table, $data);
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    private function _destroy($table, $data)
    {
        $id = intval($data);
        $response = $this->_model->destroy($table, $data);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }
}
