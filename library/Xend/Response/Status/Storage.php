<?php

/**
 * System response status storage
 */
class Xend_Response_Status_Storage extends Xend_Response_Status_Storage_Abstract
{
    /**
     * Module code
     *
     * @var int
     */
    protected $_moduleCode = 1;

    /**
     * Module name
     *
     * @var int
     */
    protected $_moduleName = 'System';

    public function __construct($status, $field = null)
    {
        if (is_int($status)) {
            parent::__construct($status, $field);
        } else {
            $this->_msg = $status;
            parent::__construct(self::SPECIAL_ERROR);
        }
    }
}
