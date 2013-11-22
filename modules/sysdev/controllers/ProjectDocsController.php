<?php

/**
 * Project Docs Controller conroller
 */
class Sysdev_ProjectDocsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Sysdev_ProjectDocs_Model();
        $this->_versions_model = new Sysdev_ProjectDocsVersions_Model();

        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->sysdev->docs);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by-project');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-doc-versions');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'download');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'download-version');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'upload');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'upload-version');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-version');
    }

    public function getByProjectAction()
    {
        $response = $this->_model->getByProject($this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->success = true;
            $this->view->data = $response->getRowset();
            $this->view->total = $response->totalCount;
        } else {
            $this->_collectErrors($response);
        }
    }

    public function getDocVersionsAction()
    {
        $response = $this->_versions_model->getByDoc($this->_getAllParams());
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
    public function downloadVersionAction()
    {
        $id = intval($this->_getParam('id'));

        $response = $this->_versions_model->getById($id);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $data = $response->getRowset();
//        $path = $this->_filesPath . DIRECTORY_SEPARATOR . $data['project_id'] . DIRECTORY_SEPARATOR . $data['url'];
        $file = new Xend_File();
        $download = $file->download($data['file_id']);
        if ($download->isError()) {
            $this->_collectErrors($download);
            return;
        }
        $this->view->success = true;

    }

    public function uploadAction()
    {
//        $data = $this->_getAllParams();


        $project_id = intval($this->_getParam('project_id'));

        $data['project_id'] = $project_id;
//        $data['name'] = $this->_getParam('X-File-Name');

        if ($project_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
            $this->_collectErrors($response);
            return;
        }

        $fileNameInfo = pathinfo($_GET['X-File-Name']);

        $data['name'] = $fileNameInfo['filename'];

        $modResponse = $this->_model->add($data);

        if ($modResponse->hasNotSuccess()) {
//            $fileUploader->deleteFile($data['file_id']);
            $this->_collectErrors($modResponse);
            return;
        } else {

            $this->view->success = true;
        }

    }

    public function uploadVersionAction()
    {
        $doc_id = intval($this->_getParam('doc_id'));

        $data['doc_id'] = $doc_id;
//        $data['name'] = $this->_getParam('X-File-Name');

        if ($doc_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, '$doc_id'));
            $this->_collectErrors($response);
            return;
        }

        $fileNameInfo = pathinfo($_GET['X-File-Name']);
//        $data['file_id'] = $fileResponse->__get('file_id');
//        $data['name'] = $_GET['X-File-Name'];
//
        $data['name'] = $_GET['X-File-Name'];

        $modResponse = $this->_versions_model->add($data);

        if ($modResponse->hasNotSuccess()) {
//            $fileUploader->deleteFile($data['file_id']);
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