<?php

/**
 * The login validator
 */
class Xend_Validate_Login extends Zend_Validate_Abstract
{

    const INCORRECT = 'notCorrectLogin';

    /**
     * Contain error messages
     * @var array
     */
    protected $_messageTemplates = array(
        self::INCORRECT => "'%value%' is not correct login"
    );

    /**
     * Defined by Zend_Validate_Interface
     *
     * Returns true if and only if $value is a valid login
     *
     * @param  string|int $value
     * @return boolean
     */
    public function isValid($value)
    {
        $regex = new Zend_Validate_Regex('/^.{3,50}$/');
        if (!$regex->isValid($value)) {
            $this->_error(null, $value);
            return false;
        }

        return true;
    }
}
