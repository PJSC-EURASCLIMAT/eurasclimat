<?php

/**
 * Simple acl object
 */
class Xend_Acl
{
    /**
     * Permission rules collection
     *
     * @var array
     */
    protected $_rules = array();

    /**
     * Set privilege to resource
     *
     * @param int $resource
     * @param int $privilege
     * @return Xend_Acl
     */
    public function allow($resource, $privilege)
    {
        $resource = (string) $resource;
        $this->addResource($resource);
        if (!in_array($privilege, $this->_rules[$resource])) {
            $this->_rules[$resource][] = $privilege;
        }
        return $this;
    }

    /**
     * Check if allowed privilege to resource
     *
     * @param string|Xend_Acl_Resource_Generator $resource
     * @param int $privilege
     * @return boolean
     */
    public function isAllowed($resource, $privilege)
    {
        $resource = (string) $resource;
        if (!array_key_exists($resource, $this->_rules)) {
            return false;
        }

        return in_array($privilege, $this->_rules[$resource]);
    }

    /**
     * Add resource to collectoin
     *
     * @param string|Xend_Acl_Resource_Generator $resource
     * @return Xend_Acl
     */
    public function addResource($resource)
    {
        $resource = (string) $resource;
        if (!array_key_exists($resource, $this->_rules)) {
            $this->_rules[$resource] = array();
        }

        return $this;
    }

    /**
     * Check if resource have any privilege
     *
     * @param int $resource
     * @return bool
     */
    public function hasAnyPrivilege($resource)
    {
        $resource = (string) $resource;
        if (!isset($this->_rules[$resource])) {
            return false;
        }
        return sizeof($this->_rules[$resource]) > 0;
    }

    /**
     * Dump rules collection
     *
     * @return array
     */
    public function toArray()
    {
        return $this->_rules;
    }
}