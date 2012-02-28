<?php

/**
 * Comments status constant
 */
class Xend_Acl_Status extends Xend_Response_Status_Storage_Abstract
{
    /**
     * Module code
     *
     * @var int
     */
    protected $_moduleCode = 112;

    /**
     * Module name
     *
     * @var int
     */
    protected $_moduleName = 'Acl';

    const PRIVILEGE_DOES_NOT_EXISTS = -100;

    /**
     * Description storage
     *
     * @var array
     */
    protected $_storage = array(
        self::PRIVILEGE_DOES_NOT_EXISTS => 'Privilege does not exist'
    );
}
