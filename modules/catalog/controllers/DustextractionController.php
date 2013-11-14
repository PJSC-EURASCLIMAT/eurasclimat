<?php

class Catalog_DustextractionController extends Catalog_AbstractController
{
    public function init()
    {
        $this->_entity = 'dustextraction';
        $this->_model = new Catalog_Dustextraction_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->catalog->dustextraction);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-images');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'update');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'upload');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-image');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-related-services');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add-related-services');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'edit-related-services');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete-related-services');
    }
}