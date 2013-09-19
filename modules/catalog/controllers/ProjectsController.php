<?php

class Catalog_ProjectsController extends Xend_Controller_Action
{

    /**
     * @var model
     */
    protected $_model;

    public function init()
    {
        $this->_model = new Catalog_Projects_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->catalog->projects);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-equipment');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-equipment');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-equipment');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-equipment');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-services');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-service');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-service');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-service');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-special-services');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-special-service');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-special-service');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-special-service');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-expendables');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-expendable');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-expendable');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-expendable');
    }

    public function getListAction()
    {
        $response = $this->_model->getList($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRow();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function addAction()
    {
        $response = $this->_model->add($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateAction()
    {
        $response = $this->_model->update($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function deleteAction()
    {
        $id = intval($this->_getParam('id'));
        $response = $this->_model->delete($id);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getEquipmentAction()
    {
        $response = $this->_model->getEquipment($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function addEquipmentAction()
    {
        $response = $this->_model->addEquipment($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateEquipmentAction()
    {
        $response = $this->_model->updateEquipment($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function deleteEquipmentAction()
    {
        $id = intval($this->_getParam('id'));
        $response = $this->_model->deleteEquipment($id);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getServicesAction()
    {
        $response = $this->_model->getServices($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function addServiceAction()
    {
        $response = $this->_model->addService($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateServiceAction()
    {
        $response = $this->_model->updateService($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function deleteServiceAction()
    {
        $id = intval($this->_getParam('id'));
        $response = $this->_model->deleteService($id);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getSpecialServicesAction()
    {
        $response = $this->_model->getSpecialServices($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function addSpecialServiceAction()
    {
        $response = $this->_model->addSpecialService($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateSpecialServiceAction()
    {
        $response = $this->_model->updateSpecialService($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function deleteSpecialServiceAction()
    {
        $id = intval($this->_getParam('id'));
        $response = $this->_model->deleteSpecialService($id);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getExpendablesAction()
    {
        $response = $this->_model->getExpendables($this->_getParam('id'));
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        } else {
           $this->_collectErrors($response);
        }
    }

    public function addExpendableAction()
    {
        $response = $this->_model->addExpendable($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->id = $response->id;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function updateExpendableAction()
    {
        $response = $this->_model->updateExpendable($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function deleteExpendableAction()
    {
        $id = intval($this->_getParam('id'));
        $response = $this->_model->deleteExpendable($id);
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }
}
