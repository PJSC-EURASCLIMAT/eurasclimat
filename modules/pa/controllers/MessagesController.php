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