<?php

class Smokercabin_Description_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Smokercabin_Description_Table();
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
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function setDescriptionByThemeId($themeId, $content)
    {
        $response = new Xend_Response();

        $themeId = intval($themeId);
        if ($themeId == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'theme_id'));
        }

        $this->_table->delete(array('theme_id = ?' => $themeId));

        $id = $this->_table->insert(array(
            'theme_id'      => $themeId,
            'account_id'    => Xend_Accounts_Prototype::getId(),
            'date'          => 'NOW()',
            'content'       => $content
        ));

        return $response->addStatus(new Xend_Status(
            $id ? Xend_Status::OK : Xend_Status::ADD_FAILED));
    }
}