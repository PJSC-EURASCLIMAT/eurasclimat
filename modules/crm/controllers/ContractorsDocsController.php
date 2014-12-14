<?php

/**
 * Docs controller
 */
class Crm_ContractorsDocsController extends Xend_Controller_Action
{
    public function init()
    {
        $this->_model = new Crm_Contractors_DocsModel();
        $this->_versions_model = new Crm_Contractors_DocsVersionsModel();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->crm->contractors);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by-item');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'download');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-doc');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'upload');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-doc');
    }

    public function getByItemAction()
    {
        $response = $this->_model->getByItem($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function downloadAction()
    {
        $id = intval($this->_getParam('id'));

        $response = $this->_model->getById($id);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $data = $response->getRowset();
        $file = new Xend_File();
        $download = $file->download($data['file_id'], $data['name']);
        if ($download->isError()) {
            $this->_collectErrors($download);
            return;
        }
        $this->view->success = true;
    }

    public function updateDocAction()
    {
        $response = $this->_model->update($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
        $this->view->success = true;
    }

    public function addDocAction()
    {
        $response = new Xend_Response();

        $data = $this->_getAllParams();

        if ($data['item_id'] == 0) {
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'item_id'));
            $this->_collectErrors($response);
            return;
        }

        $modResponse = $this->_model->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {
            $this->view->success = true;
            $this->view->id = $modResponse->id;
        }
    }


    public function uploadAction()
    {
        $item_id = intval($this->_getParam('item_id'));

        $data['item_id'] = $item_id;

        if ($item_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'item_id'));
            $this->_collectErrors($response);
            return;
        }

        $fileNameInfo = pathinfo($_GET['X-File-Name']);

        $data['name'] = $fileNameInfo['filename'];

        $modResponse = $this->_model->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
            return;
        } else {

            $this->view->success = true;
        }
    }

    public function deleteAction()
    {
        $id = intval($this->_getParam('id'));

        $deleteResponse = $this->_model->delete($id);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }

    public function deleteVersionAction()
    {
        $data = $this->_getAllParams();

        $deleteResponse = $this->_versions_model->delete($data);
        if ($deleteResponse->isSuccess()) {
            $this->view->success = true;
        } else {
            $this->_collectErrors($deleteResponse);
        }
    }

}