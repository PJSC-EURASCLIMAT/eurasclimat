<?php

/**
 * Provide the output functionality by different engine
 * xml, json, html
 */
class Xend_View
{

    /**
     * Factory for Xend_View classes
     *
     * First argument may be a string containing the base of the engine class
     * name, e.g. 'json' corresponds to class Xend_View_Engine_Json.  This
     * is case-insensitive.
     *
     * Second argument is optional and may be an associative array of key-value
     * pairs.  This is used as the argument to the engine constructor.
     *
     * @param  mixed $engine String name of base engine class.
     * @param  mixed $config  OPTIONAL; an array of engine parameters.
     * @return Xend_View_Engine_Abstract | Zend_View_Abstract
     */
    public static function factory($engine, $config = array())
    {
        if (!is_string($engine) || empty($engine)) {
            throw new Xend_Exception('View engine must be specified in a string');
        }

        $engine = strtolower($engine);
        switch ($engine) {
            case 'json':
            case 'debug':
                $engineName = 'Xend_View_Engine_' . ucfirst($engine);
                $engineObject = new $engineName();
                break;

            case 'html':
                $config = array('disableLayout' => true);
            default:
                $mvc = Zend_Layout::startMvc($config);
                if (!empty($config['disableLayout']) && true == $config['disableLayout']) {
                    $mvc->disableLayout();
                }

                $engineObject = new Zend_View($config);
                $engineObject->addHelperPath('Xend/View/Helper', 'Xend_View_Helper');
                break;
        }

        return $engineObject;
    }

}
