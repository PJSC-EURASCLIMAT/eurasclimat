<?php
//die('This resource is temporary unavailable.');

error_reporting(E_ALL | E_STRICT);
ini_set('display_errors', 1);

define('DOCUMENT_ROOT', dirname(__FILE__));
define('ROOT_DIR', dirname(DOCUMENT_ROOT));
define('API_DIR', ROOT_DIR . DIRECTORY_SEPARATOR . 'library');
define('CACHE_DIR', ROOT_DIR . DIRECTORY_SEPARATOR . 'cache');
define('MODULES_DIR', ROOT_DIR . DIRECTORY_SEPARATOR . 'modules');
define('LAYOUT_DIR', ROOT_DIR . DIRECTORY_SEPARATOR . 'layouts');
define('CONFIG_FILE', ROOT_DIR . DIRECTORY_SEPARATOR . 'config.xml');
define('IMAGES_DIR', DOCUMENT_ROOT . DIRECTORY_SEPARATOR .'images');
define('FILES_DIR', ROOT_DIR . DIRECTORY_SEPARATOR . 'files');

if (!file_exists(CONFIG_FILE)) {
    throw new Exception('Project is not configured. ' . CONFIG_FILE);
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
$frontendOptions = array('lifeTime' => 1200, 'automatic_serialization' => true);
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
        throw new Exception('Error reading config.');
    }
}

date_default_timezone_set($config->ui->timezone);
Zend_Registry::set('config', $config);

/**
 * Сделал через объект, чтобы не городить $rg['sys']['mesType'] и т.д
 */
$rg = Zend_Registry::getInstance();
$rg::set('sys', new StdClass);
$rg->sys->mesTypes = array(
//    'IMPORTANT' => 1,
    'SYSTEM'    => 2,
    'FROM_USER' => 3,
);

define('ADMIN_ROLE', 1);
define('GUEST_ROLE', 2);
define('USER_ROLE', 3);
define('EXPERT_ROLE', 9);
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

$fc->registerPlugin(new Xend_Controller_Plugin_ViewEngine($options));
$fc->registerPlugin(new Xend_Controller_Plugin_Authorization());
Zend_Controller_Action_HelperBroker::addPrefix('Xend_Controller_Action_Helper');

$fc->dispatch();