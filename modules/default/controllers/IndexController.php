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
            $this->_loginAsGuest();
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
    public function authAction()
    {

        $response = new Xend_Response();

        $do = trim($this->_getParam('do'));
        $login = trim($this->_getParam('login'));
        $password = trim($this->_getParam('password'));

        if (empty($do) || empty($login) || empty($password)) {
            $this->view->success = false;
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
            $this->view->success = false;
            return;
        }

        // instance of stdClass
        $data = $authAdapter->getResultRowObject(null, 'password');

        if($data->active !== "1"){
            $response->addStatus(new Xend_Accounts_Status(Xend_Accounts_Status::ACCOUNT_IS_NOT_ACTIVE));
            $this->_collectErrors($response);
            $this->view->success = false;
            return;
        }

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

        //header('Location: /');
        $this->view->success = true;
    }

    public function loginAction()
    {
        //от
        $this->disableLayout(true);
        if (Zend_Auth::getInstance()->hasIdentity()) {
            Zend_Auth::getInstance()->clearIdentity();
        }
        Zend_Session::destroy();

        // Отключает рендер дефолтного шаблона
//        $this->disableRender();

        // Ренрерит заданный шаблон
        //$this->renderScript('/index/login.phtml');
    }

    public function activateAction()
    {
        $this->disableLayout(true);

        $hash = $this->_getParam('hash');

        if (empty($hash)) {
            $this->view->success = false;
            $this->view->message = "Ваш ключ активации недействителен";
            return;
        }

        $keys_model = new Xend_Accounts_Model_AuthKeys();
//        $accounts_table = new Xend_Accounts_Table_Accounts();
        $accounts_model = new Xend_Accounts();


        $keysResp = $keys_model->getUserIdByKey($hash);
        if ($keysResp->hasNotSuccess()) {
            $this->view->success = false;
            $this->view->message = "Ваш ключ активации недействителен";
            return;
        }

        $activateResp = $accounts_model->activate($keysResp->user_id);
        if ($activateResp->hasNotSuccess()) {
            $this->view->success = false;
            $this->view->message = "Ошибка активации аккаунта";
            return;
        }

        $hashDeleteResp = $keys_model->deleteByUserId($keysResp->user_id);
//        if ($hashDeleteResp->hasNotSuccess()) {
//            $this->view->success = false;
//            $this->view->message = "В ходе активации возникла ошибка (не удалось удалить ключ)";
//            return;
//        }

        $this->view->message = "Ваш аккаунт успешно активирован";
        $this->view->success = true;

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
        //$this->getResponse()->setHeader('Refresh', '3; URL=http://my.url.com');
        header('Location: /');
    }

    public function getPermissionsAction()
    {
        $this->disableLayout(true);
        $this->getResponse()->setHeader('Content-Type', 'application/javascript');

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

        $identity = Xend_Accounts_Prototype::getInformation();

        $expertsModel = new Experts_Experts_Model();
        $identity->expert_id = $expertsModel->getExpertIdByAccountId($identity->id);

        $this->view->identity = $identity;
        $this->view->resources = $resourceCollection;
        $privilege = Xend_Acl_Privilege::fetchAll();
        $this->view->privileges = (object) $privilege;
    }

    public function getSystemSettingsAction()
    {
        $this->disableLayout(true);
        $this->getResponse()->setHeader('Content-Type', 'application/javascript');

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

        $identity = Xend_Accounts_Prototype::getInformation();

        $expertsModel = new Experts_Experts_Model();
        $identity->expert_id = $expertsModel->getExpertIdByAccountId($identity->id);

        $this->view->identity = $identity;
        $this->view->resources = $resourceCollection;
        $privilege = Xend_Acl_Privilege::fetchAll();
        $this->view->privileges = (object) $privilege;

        $registry = Zend_Registry::getInstance();
        $mesTypes = $registry->sys->mesTypes;

        $this->view->messageTypes = array(
//            $mesTypes['IMPORTANT'] => 'Важные',
            $mesTypes['SYSTEM'] => 'Системные',
            $mesTypes['FROM_USER'] => 'Прочие',
        );
    }

    public function getCountriesAction()
    {
        $locales = Zend_Locale::getLocaleList();

        if (is_array($locales)) {
            foreach ($locales as $k => $v) {
                $locale = new Zend_Locale($k);
                $lang = $locale->getLanguage();
                try {
                    $out[$lang] = Zend_Locale::getLanguageTranslation($locale->getLanguage(), $locale)
                                . ' (' . Zend_Locale::getLanguageTranslation($locale->getLanguage(), 'ru') . ')';
                } catch (Exception $e) {}
            }
        }

        echo '<pre>';
        var_export($out);
        exit;

        if ($callback) {
            $this->disableRender(true);
            echo $callback.'('.Zend_Json::encode($output).')';
        } else {
            $this->view->countries = $output;
            $this->view->success = true;
        }
    }
    
    public function checkFilesAction()
    {
        $this->disableLayout(true);
        $fileModel = new Xend_File();
        $response = $fileModel->fetchAbsentFiles();
        $data = $response->getRowset(); 
        $this->view->data = $data;
        $this->view->count = sizeof($data);
    }
    
    public function lostFilesAction()
    {
        $this->disableLayout(true);
        $fileModel = new Xend_File();
        $response = $fileModel->fetchLostFiles();
        $data = $response->getRowset(); 
        $this->view->data = $data;
        $this->view->count = sizeof($data);
    }

    public function checkPdAction()
    {
        $this->disableLayout(true);
        $fileModel = new Xend_File();
        $response = $fileModel->fetchAbsentProjectsDocsVersionsFiles();
        $data = $response->getRowset();
        $this->view->data = $data;
        $this->view->count = sizeof($data);
    }
    
    private function _loginAsGuest()
    {
        Zend_Auth::getInstance()->clearIdentity();

        $login = 'guest';
        $password = 'guest';

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

        //header('Location: /');
    }
}