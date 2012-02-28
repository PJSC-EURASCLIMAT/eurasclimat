<?php

/**
 * include css files
 */
class Xend_View_Helper_IncludeCss
{
    /**
     * @var Zend_View
     */
    public $view;

    public function IncludeCss($params = array())
    {
		return Xend_Script::factory("Css")->generateHtml($params, $this->view->baseUrl());
    }

    public function setView(Zend_View_Interface $view)
    {
        $this->view = $view;
    }
}