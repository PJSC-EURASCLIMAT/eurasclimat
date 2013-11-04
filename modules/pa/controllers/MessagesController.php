<?php

/**
 * Personal Account Messages Controller
 */
class PA_MessagesController extends Xend_Controller_Action
{

    /**
     * @var PA_Messages_Model
     * */
    protected $_model;

    public function init()
    {
        $this->_model = new PA_Messages_Model();
        parent::init();
    }

    public function permission(Xend_Controller_Action_Helper_Acl $acl)
    {
        $acl->setResource(Xend_Acl_Resource_Generator::getInstance()->pa->messages);
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-list');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'unread-count');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'mark-as-read');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
    }

    public function unreadCountAction ()
    {
        $id = $this->_getParam('id');

        $response = $this->_model->getUserUnreadMesCount($id);
        $this->view->data = $response->count;

        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }

    }

    public function addAction ()
    {
        $data = $this->_getAllParams();

        $auth = Zend_Auth::getInstance();
        $identity = $auth->getIdentity();

        $data['sender_id'] = $identity->id;

        $response = $this->_model->add($data);

        if ($response->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $accounts = new Xend_Accounts();
        $receiverRequest = $accounts->fetchAccount(intval($data['receiver_id']));
        if ($receiverRequest->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $receiverInfo = $receiverRequest->getRowset();

        $emailResponse = $this->_sendReminder($receiverInfo['name'], $receiverInfo['email'], $identity->name, $data['message']);
        if ($emailResponse->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $this->view->success = true;

    }

    /**
     * Отправка письма - известия о новом сообщении
     */

    private function _sendReminder($receiver_name, $receiver_email, $sender_name, $message)
    {
        $response = new Xend_Response();
        $config = Zend_Registry::get('config');

//        $receiver_name = 'Андрей';
//        $receiver_email = 'ansinyutin@yandex.ru';
//        $sender_name = 'Валера';

        $mail = new Zend_Mail('UTF-8');
        $mail->setBodyHtml('<p>Уважаемый '.$receiver_name.',</p><p>Вам пришло новое сообщение от пользователя '.$sender_name.':</p><p>'.$message.'</p>');
        $mail->setFrom($config->mail->from->address, $config->company->name);
        $mail->addTo($receiver_email, $receiver_name);
        $mail->setSubject('Новое сообщение на сайте eurasclimat.ru');

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

    public function markAsReadAction ()
    {
        $id = $this->_getParam('id');

        $response = $this->_model->markAsRead($id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }

    }



    public function deleteAction()
    {
        $id = $this->_getParam('id');

        $response = $this->_model->delete($id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }



    /**
     * List of messages
     */
    public function getListAction()
    {
        $auth = Zend_Auth::getInstance();
        $Identity = $auth->getIdentity();
        $curAccountId = (null == $Identity) ? 0 : intval($Identity->id);

        $response = $this->_model->fetchByReceiver($curAccountId);
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }
    }




}