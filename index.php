<?php
//die('This resource is temporary unavailable.');

ini_set('session.gc_maxlifetime', 28800);

if (!empty($argv[1])) {
    $_SERVER['REQUEST_URI'] = $argv[1];
}

error_reporting(E_ALL | E_STRICT);

define('ROOT_DIR', dirname(__FILE__));
define('API_DIR', ROOT_DIR . '/library');
define('FILES_DIR', ROOT_DIR . '/files');
define('CACHE_DIR', ROOT_DIR . '/cache');
define('MODULES_DIR', ROOT_DIR . '/modules');
define('LAYOUT_DIR', ROOT_DIR . '/layouts');
define('CONFIG_FILE', ROOT_DIR . '/config/config.xml');

if (!file_exists(CONFIG_FILE)) {
    header('Location: /setup/');
    exit;
}

set_include_path(join(PATH_SEPARATOR, array(ROOT_DIR, API_DIR)));

require_once 'Zend/Loader/Autoloader.php';
require_once 'Xend/Loader/Autoloader.php';

$autoloader = Zend_Loader_Autoloader::getInstance();
$autoloader->setFallbackAutoloader(true);
$autoloader->pushAutoloader(array('Xend_Loader_Autoloader', 'autoload'));

Zend_Session::start();

/**
 * Configure cache
 */
$frontendOptions = array('lifeTime' => 120, 'automatic_serialization' => true);
$backendOptions  = array('cache_dir' => CACHE_DIR);
$cacheCore       = Zend_Cache::factory('Core', 'File', $frontendOptions, $backendOptions);
$cacheOutput     = Zend_Cache::factory('Output', 'File', $frontendOptions, $backendOptions);
Zend_Registry::set('cachecore', $cacheCore);
Zend_Registry::set('cacheoutput', $cacheOutput);

if (!$config = $cacheCore->load('config')) {
    try {
        $config = new Zend_Config_Xml(CONFIG_FILE, 'general');
        $cacheCore->save($config);
    } catch (Exception $e) {
        header('Location: /setup/');
    }
}

date_default_timezone_set($config->ui->timezone);
Zend_Registry::set('config', $config);

define('ADMIN_ROLE', 1);
define('DEBUG', (boolean) $config->debug);
define('MYSQL_DATE_TIME_FORMAT', 'Y-m-d H:i:s');
define('MYSQL_DATE_FORMAT', 'Y-m-d');
define('DATE_TIME_FORMAT', 'YY-MM-DD HH:mm:ss');
define('TIME_FORMAT', 'HH:mm:ss');
define('DATE_FORMAT', 'YYYY-MM-DD');
define('DATE_DISPLAY_FORMAT', 'd-m-Y');

if (!DEBUG) {
    error_reporting(0);
    ini_set('display_errors', 0);
}

/**
 * Needed this specific loading because in factory method
 * the adapter name convert to camel case
 */
Zend_Loader::loadClass('Xend_Db_Adapter_Pdo_Mysql');

$dbConfig = $config->db->toArray();
$dbConfig['adapterNamespace'] = 'Xend_Db_Adapter';

$db = Zend_Db::factory('PDO_MYSQL', $dbConfig);
$db->query('SET names utf8');

Zend_Db_Table_Abstract::setDefaultAdapter($db);
Zend_Db_Table_Abstract::setDefaultMetadataCache($cacheCore);
Zend_Registry::set('db', $db);

Xend_Db_Table_Abstract::setDefaultSequence(true);

if (DEBUG) {
    $profiler = new Zend_Db_Profiler_Firebug('All DB Queries');
    $profiler->setEnabled(true);
    $db->setProfiler($profiler);
}

/**
 * Prepare front controller
 */
$fc = Zend_Controller_Front::getInstance();
$fc->throwExceptions(DEBUG);
$fc->addModuleDirectory(MODULES_DIR);

$options = array(
    'layoutPath'    => LAYOUT_DIR,
    'debug'         => DEBUG,
    'locale'        => 'ru'
);

if (!Xend_Accounts_Prototype::isAuthenticated()) {
    $options['layout'] = 'auth';
}

$fc->registerPlugin(new Xend_Controller_Plugin_ViewEngine($options));
$fc->registerPlugin(new Xend_Controller_Plugin_Authorization());
Zend_Controller_Action_HelperBroker::addPrefix('Xend_Controller_Action_Helper');

$fc->dispatch();