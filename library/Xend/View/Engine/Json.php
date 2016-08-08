<?php

/**
 * Xend_View_Engine_Json
 *
 * Allows contain view data and return json object
 */
class Xend_View_Engine_Json extends Xend_View_Engine_Abstract
{
    public function render($name)
    {
        echo Zend_Json::encode($this->getCollection());
    }

    public function getEngine()
    {
        return 'json';
    }
}