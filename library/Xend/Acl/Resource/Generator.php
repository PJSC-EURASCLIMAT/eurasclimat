<?php

/**
 * Simple Resource generator
 */
class Xend_Acl_Resource_Generator
{
    /**
     * Unique id of Resource
     *
     * @var string
     */
    protected $_resourceId = null;

    /**
     * Resource table object
     *
     * @var Xend_Acl_Table_Resource
     */
    protected $_tableResource = null;

    /**
     * Instance of self
     *
     * @var Xend_Acl_Resource_Generator
     */
    protected static $_instance = null;

    /**
     * Retrieve the instance of self
     *
     * @return Xend_Acl_Resource_Generator
     */
    public static function getInstance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        self::$_instance->_resourceId = null;
        return self::$_instance;
    }

    /**
     * Constructor closed
     *
     */
    private function __construct()
    {
        $this->_tableResource = new Xend_Acl_Table_Resource();
    }

    /**
     * Fetch resource and create if not exists
     *
     * @param int   The resource
     * @return Xend_Acl_Resource_Generator
     */
    public function __get($param)
    {
        return $this->_getResource($param, true);
    }

    /**
     * Get resource
     *
     * @param int $resource
     * @return Xend_Acl_Resource_Generator
     */
    public function get($resource)
    {
        return $this->_getResource($resource, false);
    }

    /**
     * Fetch resources
     *
     * @param string $param
     * @return Xend_Acl_Resource_Generator
     */
    protected function _getResource($resource, $autoCreate = true)
    {
        $id = $this->_tableResource->fetchResourceId($resource, $this->_resourceId, $autoCreate);
        $this->_resourceId = $id;
        return $this;
    }

    /**
     * To string comparision
     *
     * @return string
     */
    public function __toString()
    {
        return (string) $this->_resourceId;
    }
}