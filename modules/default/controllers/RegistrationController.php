<?php

/**
 * Default application conroller
 */
class RegistrationController extends Xend_Controller_Action
{
    /**
     * The main access point into application
     */
    public function indexAction()
    {
    }

    public function registerAction()
    {
        $model = new Xend_Accounts();
        $response = $model->createAccount($this->_getAllParams());

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $resp = $model->setRoles(intval($response->id), USER_ROLE);
        if ($resp->isError()) {
            $this->_collectErrors($resp);
            return;
        }

        //генерим ключ
        $hash = md5(uniqid(rand(), true));

        //записываем в табличку

        $keyId = 0;

        $keyResp = new Xend_Response();
        $keys_table = new Xend_Accounts_Table_AuthKeys();
        $keyId = $keys_table->insert(array('user_id' => $response->id, 'hash' => $hash));

        if ($keyId == 0) {
            $keyResp->addStatus(new Xend_Accounts_Status(Xend_Accounts_Status::FAILURE));
            $this->_collectErrors($keyResp);
            return;
        }

        $config = Zend_Registry::get('config');

        /*
        * Отправка письма
        * */
        $mail = new Zend_Mail();
        $mail->setBodyHtml('<p>Для активации аккаунта пройдите по следующей ссылке.</p><a href="http://'.$config->baseurl.'/index/activate/?hash='.$hash.'">http://'.$config->baseurl.'/index/activate/?hash='.$hash.'</a>');
        $mail->setFrom($config->mail->from->address, $config->company->name);
//        $mail->addTo('ansinyutin@yandex.ru');
        $mail->addTo($response->login);
        $mail->setSubject('Активация аккаунта');
        $mail->send();

        $this->view->success = true;
    }

    public function checkLogin()
    {
        $model = new Xend_Accounts();
        $response = $model->accoutExists($this->_getParam('login'));

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }
        $this->view->exists = $model->exists;
        $this->view->success = true;
    }
}