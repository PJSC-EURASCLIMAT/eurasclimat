<?php

class Sysdev_Description_Model
{
    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Sysdev_Description_Table();
    }

    public function getDescriptionByThemeId($themeId)
    {
        $response = new Xend_Response();

        $themeId = intval($themeId);
        if ($themeId == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'theme_id'));
        }

        $row = $this->_table->fetchRow(array('theme_id = ?' => $themeId));
        $response->setRow($row);
        return $response->addStatus(new Xend_Acl_Status(Xend_Acl_Status::OK));
    }
}