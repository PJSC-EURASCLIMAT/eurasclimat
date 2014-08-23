<?php

class Catalog_ModelAbstract
{
    protected $_table;

    protected $_structure;

    public function getList($params)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(array('t' => $this->_table->getTableName()),
                array('id', 'mark_id', 'name', 'price', 'currency_id')
            )->joinLeft(
                array('marks' => 'catalog_marks'),
                'marks.id=t.mark_id',
                array(
                     'mark_name' => 'marks.name'
                )
            );

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

        $row = $this->_table->findOne($id);
        if (!$row) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }
        $response->setRow($row->toArray());
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function add(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'mark_id'               => array('Id', 'allowEmpty' => true),
            'name'                  => array(array('StringLength', 0, 255), 'allowEmpty' => false)
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
        $id = intval($id);
        $response = new Xend_Response();
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

    public function update(array $params)
    {
        $validators = array();

        foreach($this->_structure->data as $v) {
            $validators[$v['name']] = $v['validator'];
        }

        $f = new Xend_Filter_Input(array('*' => 'StringTrim'), $validators, $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function getFields()
    {
        $fields = array();

        foreach($this->_structure->data as $v) {
            $f = array(
                'xtype'         => $v['xtype'],
                'fieldLabel'    => $v['fieldLabel'],
                'name'          => $v['name']
            );
            if (!empty($v['values'])) {
                $f['values'] = $v['values'];
            }
            $fields[] = $f;
        }

        $response = new Xend_Response();
        $response->setRow($fields);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}