<?php

/**
 * Interface for Xend_View_Engine compability
 */
interface Xend_View_Engine_Interface extends Zend_View_Interface
{

    /**
     * Retrieve a valiable from data container
     *
     * @param string $key   The variable key
     */
    public function __get($key);

    /**
     * Retrieve the data from collection storage
     *
     * @return array
     */
    public function getCollection();
}