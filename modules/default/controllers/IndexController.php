<?php

/**
 * Default application conroller
 */
class IndexController extends Xend_Controller_Action
{
    /**
     * The main access point into application
     */
    public function indexAction()
    {
        if (!Xend_Accounts_Prototype::isAuthenticated()) {
        	$assemble->path = $_SERVER['REQUEST_URI'];
            $this->_redirect('/index/login');
        }
    }

    /**
     * The log of features requests and changes in application
     */
    public function changesAction()
    {
        $this->disableRender(true);
        $file = file_get_contents(ROOT_DIR . '/docs/changes.txt');
        echo nl2br($file);
    }

    /**
     * User authentification.
     * Destroy current session and create new if authentification has been success.
     */
    public function loginAction()
    {
        Zend_Auth::getInstance()->clearIdentity();

        $do = trim($this->_getParam('do'));
        $login = trim($this->_getParam('login'));
        $password = trim($this->_getParam('password'));
        $errMes = 'ОШИБКА АВТОРИЗАЦИИ!';

        if (empty($do)) {
            $this->view->message = '';
            return;
        }

        if (empty($login) || empty($password)) {
            $this->view->message = $errMes;
            return;
        }

        $dbAdapter = Xend_Db_Table_Abstract::getDefaultAdapter();
        $authAdapter = new Zend_Auth_Adapter_DbTable($dbAdapter);

        $authAdapter->setTableName(Xend_Db_Table_Abstract::getDefaultPrefix() . 'accounts');
        $authAdapter->setIdentityColumn('login');
        $authAdapter->setCredentialColumn('password');

        $authAdapter->setIdentity($login);
        $authAdapter->setCredential(md5($password));

        $result = $authAdapter->authenticate();

        if (!$result->isValid()) {
            return;
        }

        // instance of stdClass
        $data = $authAdapter->getResultRowObject(null, 'password');

        // try to create acl object and assign the permissions
        $acl = new Xend_Acl();
        $permissions = new Xend_Acl_Permission();
        $response = $permissions->fetchAccountPermissions($data->id);
        if ($response->isSuccess()) {
            foreach ($response->getRowset() as $row) {
                $acl->allow($row['resource_id'], $row['privilege_id']);
            }
        }

        /**
         * Store acl object into the standart auth storage
         * When user go to logout or session time is out
         * then acl will be destroyed with user's authentification settings
         */
        $data->acl = $acl;

        $auth = Zend_Auth::getInstance();
        $auth->getStorage()->write($data);

        header('Location: /');
    }

    /**
     * Destroy account session and redirect on base site url.
     */
    public function logoutAction()
    {
        $this->disableRender(true);
        if (Zend_Auth::getInstance()->hasIdentity()) {
            Zend_Auth::getInstance()->clearIdentity();
        }
        Zend_Session::destroy();

        $this->view->success = true;
        header('Location: /');
    }

    public function getPermissionsAction()
    {
        $this->disableLayout(true);

        $acl = Xend_Accounts_Prototype::getAcl();
        $aclCollection = array();
        if (!empty($acl)) {
            $aclCollection = (object) $acl->toArray();
        };
        $this->view->acl = $aclCollection;

        $resourceCollection = array();
        $resource = new Xend_Acl_Resource();
        $response = $resource->fetchAll();
        if ($response->isSuccess()) {
            foreach ($response->rows as $row) {
                $resourceCollection[] = array($row['id'], strtolower($row['name']), $row['parent_id']);
            }
        }

        $this->view->resources = $resourceCollection;
        $privilege = Xend_Acl_Privilege::fetchAll();
        $this->view->privileges = (object) $privilege;
    }

    public function getCountriesAction()
    {
        $countries = Zend_Locale::getCountryTranslationList();
        echo '<pre>';
        var_export($countries);
        exit;

        if (is_array($countries)) {
            sort($countries);
            foreach ($countries as $v) {
                array_push($output, array('name' => $v));
            }
        }
        if ($callback) {
            $this->disableRender(true);
            echo $callback.'('.Zend_Json::encode($output).')';
        } else {
            $this->view->countries = $output;
            $this->view->success = true;
        }
    }
}