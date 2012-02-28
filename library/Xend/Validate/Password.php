<?php

/**
 * The basic password validator
 */
class Xend_Validate_Password extends Zend_Validate_Abstract
{

    const INCORRECT = 'notCorrectPassword';

    /**
     * Contain error messages
     * @var array
     */
    protected $_messageTemplates = array(
        self::INCORRECT => "'%value%' is not correct password"
    );

    /**
     * Defined by Zend_Validate_Interface
     *
     * Returns true if and only if $value is a valid password
     *
     * @param  string|int $value
     * @return boolean
     */
    public function isValid($value)
    {
        $regex = new Zend_Validate_Regex('/^\w{3,15}$/');

        if (!$regex->isValid($value)) {
            $this->_error(null, $value);
            return false;
        }

        return true;
    }
}
