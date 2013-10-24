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
                    'read'
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
            'sender_id'      => array('Id', 'allowEmpty' => false),
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

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function delete($id)
    {
        $response = new Xend_Response();

        $res = $this->_table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }


//
//    public function getList($params)
//    {
//        $response = new Xend_Response();
//
//        $select = $this->_table->getAdapter()->select()
//            ->from(array('i' => $this->_table->getTableName()));
//
//        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
//        $plugin->parse($params);
//
//        if ($this->_isMarksEnabled()) {
//            $marks = $this->_getAllowedMarks();
//            $select->where('mark_id IN (?)', $marks);
//        }
//
//        try {
//            $rows = $select->query()->fetchAll();
//            $response->setRowset($rows);
//            $response->totalCount = $plugin->getTotalCount();
//            $status = Xend_Status::OK;
//        } catch (Exception $e) {
//            if (DEBUG) {
//                throw $e;
//            }
//            $status = Xend_Status::DATABASE_ERROR;
//        }
//        return $response->addStatus(new Xend_Status($status));
//    }


}