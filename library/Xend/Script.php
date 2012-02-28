<?php

/**
 * Class for using the script loading
 */
class Xend_Script
{
    /**
     * Create the script instance
     *
     * @param string $adapter
     * @return Xend_Script_Interface
     */
    public static function factory($adapter = 'Js')
    {
        $adapter = ucfirst(strtolower($adapter));
        $adapterNamespace = 'Xend_Script_';
        $adapterCls = $adapterNamespace . $adapter;
        $adapterInstance = new $adapterCls();
        return $adapterInstance;
    }
}