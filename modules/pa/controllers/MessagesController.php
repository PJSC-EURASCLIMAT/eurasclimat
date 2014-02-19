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
        $data['owner_id'] = $data['receiver_id'];

        $inReponse = $this->_model->add($data);
        if ($inReponse->isError()) {
            $this->_collectErrors($inReponse);
            return;
        }

        $data['owner_id'] = $identity->id;

        $outReponse = $this->_model->add($data);
        if ($outReponse->isError()) {
            $this->_collectErrors($inReponse);
            return;
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

    /**
     * List of incoming messages
     */
    public function getListAction()
    {
        $accId = Xend_Accounts_Prototype::getId();

        $response = $this->_model->getAll(new Zend_Db_Expr('receiver_id = '.$accId . ' AND owner_id = ' . $accId), $this->_getAllParams());
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

        $response = $this->_model->getAll(new Zend_Db_Expr('sender_id = '.$accId . ' AND owner_id = ' . $accId), $this->_getAllParams());
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

        $response = $this->_model->getAll(new Zend_Db_Expr('deleted = 1 AND owner_id = ' . $accId), $this->_getAllParams());
        if ($response->isSuccess()) {
            $data = $response->getRowset();
            $this->view->success = true;
            $this->view->data = $data;
        } else {
            $this->_collectErrors($response);
        }

    }


}