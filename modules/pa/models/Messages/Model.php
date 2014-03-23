<?php

/**
 * General class for manipulate account's messages
 */
class PA_Messages_Model
{
    /**
     * The accounts model
     *
     * @var Xend_Accounts_Model
     */
    protected $_accTable;

    /**
     * The messages table
     *
     * @var PA_Messages_Table
     */
    protected $_table;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->_table = new PA_Messages_Table();
        $this->_accModel = new Xend_Accounts();
    }

    public function markAsRead($idValues)
    {
        $response = new Xend_Response();
        try {
            $result = $this->_table->getAdapter()->update(
                $this->_table->getTableName(),
                array('readed' => 1),
                new Zend_Db_Expr("id IN (" . $idValues . ")")
            );

        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(
                Xend_Status::retrieveAffectedRowStatus($result)));
    }

    public function trash($idValues)
    {
        $response = new Xend_Response();

        try {
            $result = $this->_table->getAdapter()->update(
                $this->_table->getTableName(),
                array('deleted' => 1),
                new Zend_Db_Expr("id IN (" . $idValues . ")")
            );

        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(
            Xend_Status::retrieveAffectedRowStatus($result)));
    }

    public function untrash($idValues)
    {
        $response = new Xend_Response();

        try {
            $result = $this->_table->getAdapter()->update(
                $this->_table->getTableName(),
                array('deleted' => 0),
                new Zend_Db_Expr("id IN (" . $idValues . ")")
            );

        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
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
            $response->count = $this->_table->count(
                array(
                'receiver_id = ?'   => $receiver_id,
                'readed = ?'        => 0,
            ));
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status($status));
    }

    public function getAll($where, $params = array())
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
                    'readed',
                    'deleted',
                    'subject',
                    'type',
                    'sender_name',
                    'receiver_name',
                )
            )
            ->order('d.date ASC');

        if (isset($where)) {
            $select->where($where);
        }

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select, array(
            'type',
        ));
        $plugin->parse($params);

        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->total = $plugin->getTotalCount();
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
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

    /**
     * Отправляет мессадж
     * @param array $data         - параметры сообщения
     * @return Xend_Response
     */
    public function sendMessage(array $data)
    {
        $response = new Xend_Response();

        $registry = Zend_Registry::getInstance();
        $mesTypes = $registry->sys->mesTypes;

        $receivers = explode(',', $data['receiver_id']);

        $data['type'] = $mesTypes['FROM_USER'];

        $names = array();

        for ($i = 0; $i < count($receivers); $i++) {

            $receiver_id = $receivers[$i];
            $data['owner_id'] = $receiver_id;
            $data['receiver_id'] = $receiver_id;

            $inResponse = $this->add($data, true);
            if ($inResponse->hasNotSuccess()) {
                return $inResponse;
            }
            array_push($names, $inResponse->receiver_name);
        }

        if (count($receivers) != 0 && $data['sender_id'] != $receivers[0]) {
//        if ($data['sender_id'] != $receiver_id) {
            $data['owner_id'] = $data['sender_id'];
            $data['readed'] = 1;
            //TODO фильтр в $this->add отсекает new Zend_Db_Expr('NULL') и 0
//            $data['receiver_id'] = 0;
            $data['receiver_name'] = implode($names, ', ');

            $outResponse = $this->add($data);
            if ($outResponse->hasNotSuccess()) {
                return $outResponse;
            }
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    /**
     * Создает одно сообщение
     *
     * @param array $params         - параметры сообщения
     * @param bool  $sendReminder   - Отпавлять уведомления на почту
     * @param bool  $fromAdmin      - Системное сообщение
     * @return Xend_Response
     */
    public function add(array $params, $sendReminder = false, $fromAdmin = false)
    {
        $response = new Xend_Response();

        if ($fromAdmin) {
            $senderData = array('name' => 'Администрация');
        } else {
            $senderDataResponse = $this->_accModel->fetchAccount($params['sender_id']);
            if ($senderDataResponse->hasNotSuccess()) {
                return $senderDataResponse;
            }
            $senderData = $senderDataResponse->getRowset();
        }

        $params['date'] = date('Y-m-d H:i:s', time());
        $params['sender_name'] = $senderData['name'];

        if (!isset($params['receiver_name'])) {
            $receiverDataResponse = $this->_accModel->fetchAccount($params['receiver_id']);
            if ($receiverDataResponse->hasNotSuccess()) {
                return $receiverDataResponse;
            }
            $receiverData = $receiverDataResponse->getRowset();
            $params['receiver_name'] = $receiverData['name'];
        }

        $f = new Xend_Filter_Input(array(
//            'sender_id'      => 'int',
            'receiver_id'    => 'int',
            'owner_id'       => 'int',
            'type'           => 'int',
            'subject'        => 'StringTrim',
            'message'        => 'StringTrim',
        ), array(
//            'sender_id'      => array('Id', 'allowEmpty' => true),
            'receiver_id'    => array('Id', 'allowEmpty' => false),
            'owner_id'       => array('Id', 'allowEmpty' => false),
            'type'           => array('int', 'allowEmpty' => true),
            'subject'        => array(array('StringLength', 1), 'allowEmpty' => true),
            'message'        => array(array('StringLength', 1), 'allowEmpty' => false),
        ), $params);

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

        if ($sendReminder) {
            if ($fromAdmin) {
                $message = '<p>Вам пришло новое cистемное сообщение:</p>';
            } else {
                $message = '<p>Вам пришло новое сообщение от пользователя <a href="http://' . $_SERVER['HTTP_HOST'] . '/#/profile/' . $receiverInfo['id'] . '/show">' . $senderData['name'] . '</a>:</p>';
            }

            $message .= $params['message'];
            $this->_sendReminder($receiverInfo['name'], $receiverInfo['login'], $identity->name, $message );
        }

        $response->id = $id;
        $response->receiver_name = $receiverData['name'];

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    /**
     * Отправка письма - известия о новом сообщении
     */
    private function _sendReminder($receiver_name, $receiver_email, $sender_name, $message)
    {
        $config = Zend_Registry::get('config');

        // TODO проверить в конфиге
        if(Zend_Registry::get('config')->testmode == 1) {
            $receiver_email = 'ansinyutin@yandex.ru';
        }

        $mail = new Zend_Mail('UTF-8');
        $mail->setBodyHtml('<p>Уважаемый '.$receiver_name.',</p><p>'.$message.'</p>');
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

    public function delete($idValues)
    {
        $response = new Xend_Response();

        try {
            $result = $this->_table->getAdapter()->delete(
                $this->_table->getTableName(),
                new Zend_Db_Expr("id IN (" . $idValues . ")")
            );

        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(
                Xend_Status::retrieveAffectedRowStatus($result)));
    }
}