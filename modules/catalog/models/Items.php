<?php

class Catalog_Items
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Catalog_Items_Table();
    }

    public function getList($params)
    {
        $response = new OSDN_Response();

        $select = $this->_table->getAdapter()->select()
        ->from(array('i' => $this->_table->getTableName()))
        ->joinLeft(array('c' => 'catalog_categories'),
            'i.category_id=c.id',
            array('category_name' => 'c.name')
        )
        ->joinLeft(array('ch' => 'catalog_chapters'),
            'i.chapter_id=ch.id',
            array('chapter_name' => 'ch.name')
        )
        ->joinLeft(array('m' => 'catalog_marks'),
            'i.mark_id=m.id',
            array('mark_name' => 'm.name')
        )
        ->joinLeft(array('t' => 'catalog_types'),
            'i.type_id=t.id',
            array('type_name' => 't.name')
        )
        ->joinLeft(array('ms' => 'catalog_measures'),
            'i.measure_id=ms.id',
            array('type_name' => 'ms.name')
        );

        $plugin = new OSDN_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);
        try {
            $rows = $select->query()->fetchAll();
            $response->setRowset($rows);
            $response->totalCount = $plugin->getTotalCount();
            $status = OSDN_Status::OK;
        } catch (Exception $e) {
            if (OSDN_DEBUG) {
                throw $e;
            }
            $status = OSDN_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new OSDN_Status($status));
    }

    public function get($id)
    {
        $id = intval($id);
        $response = new OSDN_Response();
        if ($id == 0) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $select = $this->_table->getAdapter()->select()
        ->from(array('i' => $this->_table->getTableName()))
        ->joinLeft(array('c' => 'catalog_categories'),
            'i.category_id=c.id',
            array('category_name' => 'c.name')
        )
        ->joinLeft(array('ch' => 'catalog_chapters'),
            'i.chapter_id=ch.id',
            array('chapter_name' => 'ch.name')
        )
        ->joinLeft(array('m' => 'catalog_marks'),
            'i.mark_id=m.id',
            array('mark_name' => 'm.name')
        )
        ->joinLeft(array('t' => 'catalog_types'),
            'i.type_id=t.id',
            array('type_name' => 't.name')
        )
        ->joinLeft(array('ms' => 'catalog_measures'),
            'i.measure_id=ms.id',
            array('type_name' => 'ms.name')
        )
        ->where('i.id = ?', $id);

        $rows = $select->query()->fetchAll();
        if (!$rows) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }
        $r = $rows[0];
        $data = array(
            'id'            => $r['id'],
            'mark_id'       => $r['mark_id'],
            'measure_id'    => $r['measure_id'],
            'marking'       => $r['marking'],
            'price'         => $r['price'],
            'cold'          => $r['cold'],
            'warm'          => $r['warm'],
            'power'         => $r['power'],
            'category_id'   => array(
                                'id'    => $r['category_id'],
                                'text'  => $r['category_name'],
                            ),
            'type_id'   => array(
                                'id'    => $r['type_id'],
                                'text'  => $r['type_name'],
                            ),
            'chapter_id'   => array(
                                'id'    => $r['chapter_id'],
                                'text'  => $r['chapter_name'],
                            )
        );
        $response->setRow($data);
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function add(array $params)
    {
        $f = new OSDN_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'category_id'   => array('Id', 'presence' => 'required'),
            'mark_id'       => array('Id', 'allowEmpty' => true),
            'type_id'       => array('Id', 'allowEmpty' => true),
            'measure_id'    => array('Id', 'allowEmpty' => true),
            'chapter_id'    => array('Id', 'allowEmpty' => true),
            'price'         => array(array('Float', 'en'), 'allowEmpty' => true),
            'cold'          => array('Int', 'allowEmpty' => true),
            'warm'          => array('Int', 'allowEmpty' => true),
            'power'         => array(array('Float', 'en'), 'allowEmpty' => true),
            'marking'       => array(array('StringLength', 1, 250), 'presence' => 'required')
        ), $params);

        $response = new OSDN_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $id = $this->_table->insert($f->getData());
        if (!$id) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }

        $response->id = $id;
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function update(array $params)
    {
        $f = new OSDN_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'id'            => array('Id', 'presence' => 'required'),
            'category_id'   => array('Id', 'presence' => 'required'),
            'mark_id'       => array('Id', 'allowEmpty' => true),
            'type_id'       => array('Id', 'allowEmpty' => true),
            'measure_id'    => array('Id', 'allowEmpty' => true),
            'chapter_id'    => array('Id', 'allowEmpty' => true),
            'price'         => array(array('Float', 'en'), 'allowEmpty' => true),
            'cold'          => array('Int', 'allowEmpty' => true),
            'warm'          => array('Int', 'allowEmpty' => true),
            'power'         => array(array('Float', 'en'), 'allowEmpty' => true),
            'marking'       => array(array('StringLength', 1, 250), 'presence' => 'required')
        ), $params);

        $response = new OSDN_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = OSDN_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new OSDN_Status($status));
    }

    public function delete($id)
    {
        $id = intval($id);
        $response = new OSDN_Response();
        if ($id == 0) {
            return $response->addStatus(new OSDN_Status(
                OSDN_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $resp = $this->get($id);
        if ($resp->hasNotSuccess()) {
            return $response->importStatuses($resp->getStatusCollection());
        }
        $row = $resp->getRow();

        $res = $this->_table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }
}