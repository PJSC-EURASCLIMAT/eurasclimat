<?php

/**
 * General class for manipulate accounts
 */
class PA_Messages_Model
{
    /**
     * The accounts table
     *
     * @var Xend_Accounts_Table_Accounts
     */
    protected $_table;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->_table = new PA_Messages_Table();
    }

    public function markAsRead($id)
    {
        $id = Zend_Json::decode($id);
        $response = new Xend_Response();

        try {
            $result = $this->_table->updateByPk(array('readed' => 1), $id);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
        }

        return $response->addStatus(new Xend_Status(
            Xend_Status::retrieveAffectedRowStatus($result)));
    }


    public function getUserUnreadMesCount($receiver_id)
    {
        $response = new Xend_Response();

        $validate = new Xend_Validate_Id();
        if (!$validate->isValid($receiver_id)) {
            return $response->addStatus(new Xend_Accounts_Status(
                Xend_Accounts_Status::INPUT_PARAMS_INCORRECT, 'receiver_id'));
        }

        try {
            $count = $this->_table->count(
//                'readed = 1'
                array(
                'receiver_id = ?' => $receiver_id,
                'readed = ?'=> 0,
            )
            );
            $response->count = $count;
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status($status));
    }

    public function fetchByReceiver($receinverId)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('d'=>$this->_table->getTableName()),
                array('id',
                    'sender_id',
                    'receiver_id',
                    'message',
                    'date',
                    'readed'
                )
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'a.id=d.sender_id',
                array('sender_name' => 'name')
            )
            ->where('d.receiver_id=?', $receinverId)
            ->order('d.date ASC');

        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new Xend_Status($status));
    }


    public function add(array $params)
    {
        $params['date'] = date('Y-m-d H:i:s', time());

        $f = new Xend_Filter_Input(array(
            'sender_id'      => 'int',
            'receiver_id'    => 'int',
            'message'        => 'StringTrim'
        ), array(
            'sender_id'      => array('Id', 'allowEmpty' => true),
            'receiver_id'    => array('Id', 'allowEmpty' => false),
            'message'        => array(array('StringLength', 1), 'allowEmpty' => false),
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $this->_table->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $accounts = new Xend_Accounts();
        $receiverRequest = $accounts->fetchAccount(intval($params['receiver_id']));
        if ($receiverRequest->isError()) {
            $this->_collectErrors($response);
            return;
        }

        $auth = Zend_Auth::getInstance();
        $identity = $auth->getIdentity();

        $receiverInfo = $receiverRequest->getRowset();

        $this->_sendReminder($receiverInfo['name'], $receiverInfo['login'], $identity->name, $params['message']);

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    /**
     * Отправка письма - известия о новом сообщении
     */

    private function _sendReminder($receiver_name, $receiver_email, $sender_name, $message)
    {
        $config = Zend_Registry::get('config');

        $mail = new Zend_Mail('UTF-8');
        $mail->setBodyHtml('<p>Уважаемый '.$receiver_name.',</p><p>Вам пришло новое сообщение от пользователя '.$sender_name.':</p><p>'.$message.'</p>');
        $mail->setFrom($config->mail->from->address, $config->company->name);
        $mail->addTo($receiver_email, $receiver_name);
        $mail->setSubject('Новое сообщение на сайте eurasclimat.ru');

        try {
            @$mail->send();
            return true;
        } catch (Exception $e) {
            if (DEBUG) {
//                throw $e;
            }
            return false;
        }
    }

    public function delete($id)
    {
        $data = Zend_Json::decode($id);
        $response = new Xend_Response();

        $res = $this->_table->deleteByPk($data);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}