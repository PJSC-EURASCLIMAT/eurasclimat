<?php

/**
 * include js files
 */
class Xend_View_Helper_IncludeJs
{
    /**
     * @var Zend_View
     */
    public $view;

    public function IncludeJs($params = array())
    {
        return Xend_Script::factory()->generateHtml($params, $this->view->baseUrl());
    }

    public function setView(Zend_View_Interface $view)
    {
        $this->view = $view;
    }
}