<?php

/**
 * Accounts status constant
 */
class Xend_Accounts_Status extends Xend_Response_Status_Storage_Abstract
{
    /**
     * Module code
     *
     * @var int
     */
    protected $_moduleCode = 15;

    /**
     * Module name
     *
     * @var int
     */
    protected $_moduleName = 'Accounts';

    const ACCOUNT_IS_ALREADY_EXISTS = -100;

    const ACCOUNT_IS_PROTECTED = -101;

    const WRONG_PASSWORD = -102;

    const INCORRECT_NEW_PASSWORD = -103;

    const ACCOUNT_IS_NOT_EXISTS = -104;

    const EMAIL_DOES_NOT_EXIST = -106;

    const ACCOUNT_MAX_REACHED = -107;

    const HASH_NOT_FOUND = -108;

    const ACCOUNT_IS_NOT_ACTIVE = -109;


    /**
     * Description storage
     *
     * @var array
     */
    protected $_storage = array(
        self::ACCOUNT_IS_ALREADY_EXISTS => 'Account exists already.',
        self::ACCOUNT_IS_PROTECTED      => 'Account is protected.',
        self::ACCOUNT_MAX_REACHED       => 'Max number of accounts reached.',
        self::WRONG_PASSWORD            => 'Wrong password',
        self::INCORRECT_NEW_PASSWORD    => 'Incorrect new password',
        self::ACCOUNT_IS_NOT_EXISTS     => 'Account does not exist.',
        self::EMAIL_DOES_NOT_EXIST      => 'Email does not exist',
        self::HASH_NOT_FOUND            => 'Hash does not exist',
        self::ACCOUNT_IS_NOT_ACTIVE     => 'Account is not active'
    );
}
