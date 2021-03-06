<?php

/**
 * The md5 hash validator
 */
class Xend_Validate_Md5 extends Zend_Validate_Abstract
{

    const INCORRECT = 'notCorrectCode';

    /**
     * Contain error messages
     * @var array
     */
    protected $_messageTemplates = array(
        self::INCORRECT => "'%value%' does not appear to be an md5 hash"
    );

    /**
     * Defined by Zend_Validate_Interface
     *
     * Returns true if and only if $value is a valid secure id
     *
     * @param  string $value
     * @return boolean
     */
    public function isValid($value)
    {
        $regex = new Zend_Validate_Regex('/^[a-f0-9]{32}$/');
        if (!$regex->isValid($value)) {
            $this->_error(null, $value);
            return false;
        }

        return true;
    }
}
