<?php

/**
 * Xend_View_Engine_Debug
 *
 * Allows contain view data and debug view data
 */
class Xend_View_Engine_Debug extends Xend_View_Engine_Abstract
{
    public function render($name)
    {
        if (!DEBUG) {
            throw new Xend_Exception('Debugging is disabled. Change the view');
            exit();
        }

        Zend_Debug::dump($this->getCollection());
    }

    public function getEngine()
    {
        return 'debug';
    }
}