<?php

/**
 * Acl privilege storage
 */
class Xend_Acl_Privilege
{
    const VIEW = 1;

    const UPDATE = 2;

    /**
     * Fetch all privilege
     *
     * @return array
     */
    public static function fetchAll()
    {
        $reflection = new ReflectionClass(new self());
        $constants = $reflection->getConstants();
        return array_change_key_case($constants, CASE_LOWER);
    }

    public static function getPrivilegeValues()
    {
        return array_values(self::fetchAll());
    }

    public static function isExists($name)
    {
        $values = self::fetchAll();
        return array_key_exists(strtolower($name), $values);
    }

    public static function name2id($name)
    {
        $values = self::fetchAll();
        $name = strtolower($name);
        return isset($values[$name]) ? $values[$name] : false;
    }

    public static function id2name($id)
    {
        $values = self::fetchAll();
        $key = array_search($id, $values);
        return false !== $key ? $key : false;
    }
}