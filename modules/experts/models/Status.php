<?php

/**
 * Expert status constant
 */
class Experts_Status extends Xend_Response_Status_Storage_Abstract
{
    /**
     * Module code
     *
     * @var int
     */
    protected $_moduleCode = 65;

    /**
     * Module name
     *
     * @var int
     */
    protected $_moduleName = 'Experts';

    const EXPERT_IS_ALREADY_EXISTS = -600;

    /**
     * Description storage
     *
     * @var array
     */
    protected $_storage = array(
        self::EXPERT_IS_ALREADY_EXISTS => 'Expert exists already.',
    );
}
