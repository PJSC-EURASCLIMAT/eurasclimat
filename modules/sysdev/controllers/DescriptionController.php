<?php

/**
 * Default application conroller
 */
class Sysdev_DescriptionController extends Xend_Controller_Action
{

    public function init()
    {
        $this->_model = new Sysdev_Description_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->sysdev);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-description-content');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update-description-content');
    }

    public function getDescriptionContentAction()
    {
        $this->disableLayout(true);
        $response = $this->_model->getDescriptionByThemeId($this->_getParam('theme_id'));
        if ($response->isSuccess()) {
            $row = $response->getRow();
            if ($row != null) {
                $this->view->text = $row['content'];
            } else {
                $this->view->text = 'Нет данных для отображения';
            }
        } else {
            $this->view->text = $this->_getErrors($response);
        }
    }

    public function updateDescriptionContentAction()
    {
        $response = $this->_model->setDescriptionByThemeId(
            $this->_getParam('theme_id'), $this->_getParam('content'));
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

}