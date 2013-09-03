<?php
/**
 * Created by JetBrains PhpStorm.
 * User: andrew
 * Date: 03.09.13
 * Time: 21:51
 * To change this template use File | Settings | File Templates.
 */

class Xend_Accounts_Model_Register {

    /**
     * Отправка письма с ссылкой на активацию аккаунта
     */

    public function sendRegisterKey($hash, $login, $name)
    {
        $response = new Xend_Response();
        $config = Zend_Registry::get('config');

        /*
        * Отправка письма
        * */
        $mail = new Zend_Mail();
        $mail->setBodyHtml('<p>Для активации аккаунта пройдите по следующей ссылке.</p><a href="http://'.$config->baseurl.'/index/activate/?hash='.$hash.'">http://'.$config->baseurl.'/index/activate/?hash='.$hash.'</a>');
        $mail->setFrom($config->mail->from->address, $config->company->name);
        $mail->addTo('ansinyutin@yandex.ru', $name);
//        $mail->addTo($login, $name);
        $mail->setSubject('Активация аккаунта');

        try {
            $mail->send();
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::FAILURE;
        }

        return $response->addStatus(new Xend_Accounts_Status($status));

    }

}