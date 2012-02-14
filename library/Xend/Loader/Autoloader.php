<?php

class Xend_Loader_Autoloader
{
    /**
     * Autoload a class
     *
     * @param  string $class
     * @return bool
     */
    public static function autoload($class)
    {
        if (!defined('MODULES_DIR')
            || !is_dir(MODULES_DIR)
            || class_exists($class, false)
            || interface_exists($class, false)) {

            return;
        }

        $array = explode('_', $class);
        $module = strtolower(array_shift($array));
        $model = array_merge(array($module, 'models'), $array);

        $filename = join(DIRECTORY_SEPARATOR, $model) . '.php';
        if (preg_match('/[^a-z0-9\\/\\\\_.:-]/i', $filename)) {
            return;
        }

        $file = MODULES_DIR . DIRECTORY_SEPARATOR . $filename;
        if (!is_file($file)) {
            return false;
        }

        include $file;
    }
}
