<?php

class Catalog_AbstractController extends Xend_Controller_Action
{

    /**
     * @var model
     */
    protected $_model;

    protected $_entity;

    public function getListAction()
    {
        $response = $this->_model->getList($this->_getAllParams());
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getAction()
    {
        $response = $this->_model->get($this->_getParam('id'));
        if ($response->isSuccess()) {
            $row = $response->getRow();
            $model = new Catalog_Images($this->_entity);
            $resp = $model->getAll($this->_entity, $row['id']);
            if ($resp->hasNotSuccess()) {
                $row['images'] = array();
            } else {
                $row['images'] = $resp->getRowset();
            }
            $this->view->success = true;
            $this->view->data = $row;
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
            $images = new Catalog_Images($this->_entity);
            $images->deleteAllImages($id);
            $this->view->success = true;
        } else {
           $this->_collectErrors($response);
        }
    }

    public function getFieldsAction()
    {
        $this->disableRender();
        $response = $this->_model->getFields();
        if ($response->isSuccess()) {
            $data = $response->getRow();
        } else {
            $data = array();
        }
        echo Zend_Json::encode($data);
    }

    public function uploadAction()
    {
        $id = intval($this->_getParam('id'));
        if ($id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
            $this->_collectErrors($response);
        }

        $response = Xend_File::uploadFile('catalog');
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        }

        $model = new Catalog_Images($this->_entity);
        $response = $model->add($response->fileName, $id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function getImagesAction()
    {
        $id = intval($this->_getParam('id'));
        if ($id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
            $this->_collectErrors($response);
        }

        $model = new Catalog_Images($this->_entity);
        $response = $model->getAll($this->_entity, $id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
            $this->view->rows = $response->getRowset();
        }
    }

    public function deleteImageAction()
    {
        $id = intval($this->_getParam('id'));
        if ($id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
            $this->_collectErrors($response);
        }

        $model = new Catalog_Images($this->_entity);
        $response = $model->delete($id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function getRelatedServicesAction()
    {
        $id = intval($this->_getParam('id'));
        if ($id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
            $this->_collectErrors($response);
        }

        $model = new Catalog_RelatedServices($this->_entity);
        $response = $model->getAll($id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
        }
    }

    public function addRelatedServicesAction()
    {
        $model = new Catalog_RelatedServices($this->_entity);
        $response = $model->add($this->_getAllParams());
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function editRelatedServicesAction()
    {
        $model = new Catalog_RelatedServices($this->_entity);
        $response = $model->update($this->_getAllParams());
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function deleteRelatedServicesAction()
    {
        $id = intval($this->_getParam('id'));
        if ($id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
            $this->_collectErrors($response);
        }

        $model = new Catalog_RelatedServices($this->_entity);
        $response = $model->delete($id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }
}