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
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-sent-list');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'get-deleted-list');
        $acl->isAllowed(Xend_Acl_Privilege::VIEW, 'unread-count');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'add');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'mark-as-read');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'delete');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'trash');
        $acl->isAllowed(Xend_Acl_Privilege::UPDATE, 'untrash');
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

        $registry = Zend_Registry::getInstance();
        $mesTypes = $registry->sys->mesTypes;

        $receivers = explode(',',$data['receiver_id']);

        $data['type'] = $mesTypes['FROM_USER'];
        $data['sender_id'] = $identity->id;

        $names = array();

        for($i = 0; $i < count($receivers); $i++)
        {
            $receiver_id = $receivers[$i];

            $data['owner_id'] = $receiver_id;
            $data['receiver_id'] = $receiver_id;

            $inResponse = $this->_model->add($data, true);
            if ($inResponse->isError()) {
                $this->_collectErrors($inResponse);
                return;
            }
            array_push($names, $inResponse->receiver_name);
        }

        if ( count($receivers) != 0 && $data['sender_id'] != $receivers[0] ) {
//        if ($data['sender_id'] != $receiver_id) {
            $data['owner_id'] = $identity->id;
            $data['readed'] = 1;
            $data['receiver_name'] = implode($names,', ');


            $outResponse = $this->_model->add($data);
            if ($outResponse->isError()) {
                $this->_collectErrors($outResponse);
                return;
            }
        }

        $this->view->success = true;

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

    public function trashAction()
    {
        $id = $this->_getParam('id');

        $response = $this->_model->trash($id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function untrashAction()
    {
        $id = $this->_getParam('id');

        $response = $this->_model->untrash($id);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    /**
     * List of incoming messages
     */
    public function getListAction()
    {
        $accId = Xend_Accounts_Prototype::getId();

        $where = new Zend_Db_Expr('receiver_id = '.$accId . ' AND owner_id = ' . $accId . ' AND deleted = 0');

        $response = $this->_model->getAll($where, $this->_getAllParams());
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }

    }

    /**
     * List of sent messages
     */
    public function getSentListAction()
    {
        $accId = Xend_Accounts_Prototype::getId();

        $where = new Zend_Db_Expr('sender_id = '.$accId . ' AND owner_id = ' . $accId . ' AND deleted = 0');

        $response = $this->_model->getAll($where, $this->_getAllParams());
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }

    }

    /**
     * List of deleted messages
     */
    public function getDeletedListAction()
    {
        $accId = Xend_Accounts_Prototype::getId();

        $where = new Zend_Db_Expr('deleted = 1 AND owner_id = ' . $accId);

        $response = $this->_model->getAll($where, $this->_getAllParams());
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }

    }


}