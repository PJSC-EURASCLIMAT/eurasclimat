<?php

/**
 * Default application conroller
 */
class IndexController extends OSDN_Controller_Action
{
    /**
     * The main access point into application
     */
    public function indexAction()
    {
        if (!OSDN_Accounts_Prototype::isAuthenticated()) {
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

        $dbAdapter = OSDN_Db_Table_Abstract::getDefaultAdapter();
        $authAdapter = new Zend_Auth_Adapter_DbTable($dbAdapter);

        $authAdapter->setTableName(OSDN_Db_Table_Abstract::getDefaultPrefix() . 'accounts');
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
        $roleId = $data->role_id;

        // try to create acl object and assign the permissions
        $acl = new OSDN_Acl();
        $permissions = new OSDN_Acl_Permission();
        $response = $permissions->fetchByRoleId($roleId);
        if ($response->isSuccess()) {
            $rowset = $response->getRowset();
            foreach ($rowset as $row) {
                $resourceId = $row['resource_id'];
                $acl->addResource($resourceId);
                $acl->allow($resourceId, $row['privilege_id']);
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
}