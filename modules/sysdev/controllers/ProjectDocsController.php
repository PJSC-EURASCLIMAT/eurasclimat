<?php

/**
 * Project Docs Controller conroller
 */
class Sysdev_ProjectDocsController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Sysdev_ProjectDocs_Model();
        $this->_filesPath = FILES_DIR . DIRECTORY_SEPARATOR . 'sysdev' . DIRECTORY_SEPARATOR . 'docs';
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->sysdev->docs);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-by-project');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'download');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'upload');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
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

    public function downloadAction()
    {
        $id = intval($this->_getParam('id'));

        $response = $this->_model->getById($id);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $data = $response->getRowset();
//        $path = $this->_filesPath . DIRECTORY_SEPARATOR . $data['project_id'] . DIRECTORY_SEPARATOR . $data['url'];
        $file = new Xend_File();
        $download = $file->download($data['file_id'], $data['name']);
        if ($download->isError()) {
            $this->_collectErrors($download);
            return;
        }
        $this->view->success = true;

    }

    public function uploadAction()
    {
        $data = $this->_getAllParams();

        $project_id = intval($this->_getParam('project_id'));

        if ($project_id == 0) {
            $response = new Xend_Response();
            $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
            $this->_collectErrors($response);
        }

        $fileUploader = new Xend_File();

//        $fileDir =  $this->_filesPath . DIRECTORY_SEPARATOR . $data['project_id'];

        $fileResponse = $fileUploader->uploadFile();

        if ($fileResponse->hasNotSuccess()) {
            $this->_collectErrors($fileResponse);
        }

        $data['file_id'] = $fileResponse->__get('file_id');
        $data['name'] = $fileResponse->__get('fileName');

        $modResponse = $this->_model->add($data);

        if ($modResponse->hasNotSuccess()) {
            $this->_collectErrors($modResponse);
        } else {
            $this->view->success = true;
        }

    }

    public function deleteAction()
    {
        $id = intval($this->_getParam('id'));

        $response = $this->_model->getById($id);
        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $deleteResponse = $this->_model->delete($id);
        if ($deleteResponse->isSuccess()) {

            $data = $response->getRowSet();
            if (false === $data['url'] || $data['url'] === '') {
                $this->view->success = false;
                return;
            }
            $filePath =  $this->_filesPath . DIRECTORY_SEPARATOR . $data['project_id'] . DIRECTORY_SEPARATOR . $data['url'];

//            $filePath = ROOT_DIR .'/httpdocs'. DIRECTORY_SEPARATOR . $data['url'];

            if (file_exists($filePath)) {
                unlink($filePath);
            }

            $this->view->success = true;

        } else {
            $this->_collectErrors($deleteResponse);
        }
    }

}