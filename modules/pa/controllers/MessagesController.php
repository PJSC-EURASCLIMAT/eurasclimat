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

    public function unreadCountAction()
    {
        $response = $this->_model->getUserUnreadMesCount($this->_getParam('id'));
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->data = $response->count;
            $this->view->success = true;
        }
    }

    public function addAction()
    {
        $data = $this->_getAllParams();

        $accountId = Xend_Accounts_Prototype::getId();
        $data['sender_id'] = $accountId;

        $reponse = $this->_model->sendMessage($data);
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function markAsReadAction()
    {
        $response = $this->_model->markAsRead($this->_getParam('id'));
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function deleteAction()
    {
        $response = $this->_model->delete($this->_getParam('id'));
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function trashAction()
    {
        $response = $this->_model->trash($this->_getParam('id'));
        if ($response->hasNotSuccess()) {
            $this->_collectErrors($response);
        } else {
            $this->view->success = true;
        }
    }

    public function untrashAction()
    {
        $response = $this->_model->untrash($this->_getParam('id'));
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
        $where = new Zend_Db_Expr('receiver_id = '
               . $accId . ' AND owner_id = '
               . $accId . ' AND deleted = 0');

        $response = $this->_model->getAll($where, $this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->data = $response->getRowset();
            $this->view->success = true;
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
        $where = new Zend_Db_Expr('sender_id = '
               . $accId . ' AND owner_id = '
               . $accId . ' AND deleted = 0');

        $response = $this->_model->getAll($where, $this->_getAllParams());
        if ($response->isSuccess()) {
            $this->view->data = $response->getRowset();
            $this->view->success = true;
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
            $this->view->data = $response->getRowset();
            $this->view->success = true;
        } else {
            $this->_collectErrors($response);
        }
    }
}