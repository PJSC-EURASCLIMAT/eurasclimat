<?php

abstract class OSDN_Script_Abstract
{
    protected $_basePath;

    protected $_xmlUrl;

    protected $_xmlName = 'jsCss.xml';

    protected $_xmlModuleDir = 'views';

    protected $_modulesDir = 'modules';

    public function __construct()
    {
        $this->_basePath = ROOT_DIR. '/html';
        $this->_xmlUrl = LAYOUT_DIR . DIRECTORY_SEPARATOR . $this->_xmlName;
    }

    public function getBasePath()
    {
        return $this->_basePath;
    }

    protected function setBasePath($basePath)
    {
        $this->_basePath = $basePath;
    }

    protected function _insertParameters(&$body, $params)
    {
        foreach ($params as $k => $v) {
            $body = str_replace($k, $v, $body);
        }
    }

    protected function _concatFilesToOne($params = array(), $fileType = 'script')
    {
        $xmlConfig = new Zend_Config_Xml($this->_xmlUrl);
        $cfg = $xmlConfig->toArray();
        $data = $cfg['data'];
        $result = array();

        $siteAddress = Zend_Registry::get('config')->site->address;

        $companyName = Zend_Registry::get('config')->company->name;

        session_write_close();
        $opts = array(
		    'http' => array(
		        'method' => 'GET',
		        'header' => 'Cookie: ' . session_name() . '=' . session_id()
		    )
		);

        foreach ((array)$data[$fileType] as $el) {

            if (is_array($el) && (isset($el['src']) || isset($el['href']))) {
                if (isset($el['debug'])
                    && DEBUG != (boolean)($el['debug'] === 'true')) {
                    continue;
                }

                if (isset($el['project'])
                    && strcasecmp($el['project'], $companyName) != 0) {
                    continue;
                }

                $src = isset($el['src']) ? $el['src'] : $el['href'];
                $last = strrchr($src, '.');

                if (0 === strpos($src, "http://")) {
                    $url = $src;
                    $separator = -1 == strpos($url, '?') ? '&' : '?';
                    $url .= $separator . session_name() . '=' . session_id();
                } elseif (!$last || $last != '.js') {
                    $url = $siteAddress . $src;
                } else {
                    $url = $this->getBasePath() . $src;
                }

                if (isset($el['cache']) && "false" == $el['cache']) {
                	$separator = -1 == strpos($url, '?') ? '&' : '?';
                    $url .= $separator . '_dc=' . uniqid();
                }

                $context = null;
                $context = stream_context_create($opts);
                $content = file_get_contents($url, 0, $context);
            } else {
                $this->_insertParameters($el, $params);
                $content = $el;
            }
            $result[] = $content;
        }

        session_start();

        return join("\r\n\r\n", $result);
    }

    public function _generateHtml($params = array(), $fileType = 'script')
    {
        $res = '';
        $res .= $this->_generateHtmlSC($this->_xmlUrl, $params, $fileType) . "\r\n";
        if (!defined('MODULES_DIR') || !is_dir(MODULES_DIR)) {
            return $res;
        }

        if ($handle = opendir(MODULES_DIR)) {
            while (false !== ($file = readdir($handle))) {
                if ($file != "." && $file != ".."
                    && is_dir(MODULES_DIR . DIRECTORY_SEPARATOR . $file)) {
                    $filePath = join(DIRECTORY_SEPARATOR, array(
                        MODULES_DIR, $file, $this->_xmlModuleDir, $this->_xmlName));
                    if (is_file($filePath)) {
                        $res .= $this->_generateHtmlSC($filePath, $params, $fileType,
                                join('/', array(
                                        $this->getBasePath(),
                                        $this->_modulesDir,
                                        $file,
                                        $this->_xmlModuleDir
                                    )
                                )
                            ) . "\r\n";
                    }
                }
            }
            closedir($handle);
        }

        return $res;
    }

    public function _generateHtmlSC($filePath, $params = array(), $fileType = 'script', $basePath = null)
    {
        $xmlConfig = new Zend_Config_Xml($filePath);
        $cfg = $xmlConfig->toArray();
        $data = $cfg['data'];

        if (!isset($data[$fileType])) {
            return '';
        }

        $srcDir = ROOT_DIR;
        if (is_null($basePath)) {
            $basePath = $this->getBasePath();
        } else {
            $srcDir = ROOT_DIR . $basePath;
        }

        $result = array();

        $companyName = Zend_Registry::get('config')->company->name;

        foreach ((array)$data[$fileType] as $el) {
            if (is_array($el) && (isset($el['src']) || isset($el['href']))) {
                if (isset($el['debug'])
                    && DEBUG != (boolean)($el['debug'] === 'true')) {
                    continue;
                }
                if (isset($el['project'])
                    && strcasecmp($el['project'], $companyName) != 0) {
                    continue;
                }
                $src = isset($el['src']) ? $el['src'] : $el['href'];
                $file = $basePath . $src . '?' . filemtime($srcDir . $src);
                if ($fileType == 'script') {
                    $content = '<script src="' . $file
                             . '" type="text/javascript"></script>';
                } else {
                    $content = '<link rel="stylesheet" href="' . $file
                             . '" type="text/css" />';
                }
            } else {
                if ($fileType == 'script') {
                    $content = '<script type="text/javascript">' . $el . '</script>';
                } else {
                    $content = '<style>' . $el . '</style>';
                }
            }
            $result[] = $content;
        }
        $res = join("\r\n", $result);
        $this->_insertParameters($res, $params);
        return $res;
    }

    abstract function get();

    abstract function generateHtml();
}