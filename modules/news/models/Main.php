<?php

class News_Main
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new News_MainTable();
    }

    public function getList($params)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('n' => $this->_table->getTableName()),
                array('id', 'date', 'category_id', 'account_id', 'title', 'long_text', 'published')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'n.account_id=a.id',
                array('author' => 'name')
            )
            ->joinLeft(
                array('c' => 'news_main_category'),
                'n.category_id=c.id',
                array('category' => 'name')
            );

        if (isset($params['actuality']) && !empty($params['actuality'])) {
            $where = $this->_getActualityFilter($params['actuality']);
            if (!empty($where)) {
                $select->where($where);
            }
        }

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->totalCount = $plugin->getTotalCount();
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new Xend_Status($status));
    }

    public function get($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('n' => $this->_table->getTableName()),
                array('id', 'date', 'category_id', 'account_id', 'title', 'long_text', 'published')
            )
            ->joinLeft(
                array('a' => 'accounts'),
                'n.account_id=a.id',
                array('author' => 'name')
            )
            ->joinLeft(
                array('c' => 'news_main_category'),
                'n.category_id=c.id',
                array('category' => 'name')
            )
            ->where('n.id = ?', $id);
//            ->limit(1);

        try {
            $rows = $select->query()->fetch();
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

    private function _getActualityFilter($type)
    {
        $type = trim($type);

        switch($type) {
            case 'today':
                return new Zend_Db_Expr('DATE(date) > DATE_ADD(CURDATE(), INTERVAL -1 DAY)');
            case 'yesterday':
                return new Zend_Db_Expr('DATE(date) > DATE_ADD(CURDATE(), INTERVAL -2 DAY)');
            case 'lastthreedays':
                return new Zend_Db_Expr('DATE(date) > DATE_ADD(CURDATE(), INTERVAL -4 DAY)');
            case 'lastweek':
                return new Zend_Db_Expr('DATE(date) > DATE_ADD(CURDATE(), INTERVAL -8 DAY)');
            case 'lastmonth':
                return new Zend_Db_Expr('DATE(date) > DATE_ADD(CURDATE(), INTERVAL -1 MONTH)');
            default:
                return '';
        }
    }

    public function update(array $data)
    {
        $response = new Xend_Response();

        // 1 фильтры - Zend_Filter
        // 2 валидаторы - Zend_Validator

        $f = new Xend_Filter_Input(array(
            'id'    => 'int',
//            'date'          => 'StringTrim',
            'category_id'   => 'int', // отсекает в '123абц' - 123
            'account_id'    => 'int',
            'title'         => 'StringTrim',
//            'short_text'    => 'int',
        ), array(
            'id'            => 'Id',
//            'date'          => array('StringLength'),
            'category_id'   => array('Id', 'allowEmpty' => true),
            'account_id'    => array('Id'),
            'title'         => array(array('StringLength', 1, 255), 'allowEmpty' => false),
//            'short_text'    => array(array('StringLength', 0, 204800), 'allowEmpty' => true)
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $rows = $this->_table->updateByPk($f->getData(), $f->id);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }


    public function add(array $data)
    {
        $response = new Xend_Response();

        $data['account_id'] = Xend_Accounts_Prototype::getId();

        $f = new Xend_Filter_Input(array(
//            'date'          => 'StringTrim',
            'category_id'   => 'int',
            'title'         => 'StringTrim',
//            'short_text'    => 'int',
        ), array(
//            'date'          => array('StringLength'),
            'category_id'   => array('Id', 'allowEmpty' => true),
            'title'         => array(array('StringLength', 1, 255), 'allowEmpty' => false),
//            'short_text'    => array(array('StringLength', 0, 204800), 'allowEmpty' => true)
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $id = $this->_table->insert($f->getData());
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        $response->id = $id;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));

    }

    public function delete(array $data)
    {
        $response = new Xend_Response();

//        $data = Zend_Json::decode($params['data']);
        $id = intval($data['id']);

        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $res = $this->_table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

}