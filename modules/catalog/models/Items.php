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
        $response = new Xend_Response();

        /*

        $select = $this->_table->getAdapter()->select()
            ->from(array('i' => $this->_table->getTableName()))
            ->joinLeft(array('titles' => 'catalog_titles'),
                'i.title_id=titles.id',
                array('title_name' => 'titles.name')
            )
            ->joinLeft(array('m' => 'catalog_marks'),
                'i.mark_id=m.id',
                array('mark_name' => 'm.name')
            )
            ->joinLeft(array('pt' => 'catalog_product_types'),
                'i.product_type_id=pt.id',
                array('product_type_name' => 'pt.name')
            )
            ->joinLeft(array('ct' => 'catalog_construction_types'),
                'i.construction_type_id=ct.id',
                array('construction_type_name' => 'ct.name')
            )
            ->joinLeft(array('t' => 'catalog_territorialities'),
                'i.territoriality_id=t.id',
                array('territoriality_name' => 't.name')
            )
            ->joinLeft(array('c' => 'catalog_conditions'),
                'i.condition_id=c.id',
                array('condition_name' => 'c.name')
            )
            ->joinLeft(array('p' => 'catalog_purposes'),
                'i.purpose_id=p.id',
                array('purpose_name' => 'p.name')
            )
            ->joinLeft(array('a' => 'catalog_availabilities'),
                'i.availability_id=a.id',
                array('availability_name' => 'a.name')
            )
            ->joinLeft(array('st' => 'catalog_system_types'),
                'i.system_type_id=st.id',
                array('system_type_name' => 'st.name')
            )
        ;
        */
        $select = $this->_table->getAdapter()->select()
            ->from(array('i' => $this->_table->getTableName()));

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
            'group_id'              => array('Id', 'allowEmpty' => true),
            'name_id'               => array('Id', 'allowEmpty' => true),
            'mark_id'               => array('Id', 'allowEmpty' => true),
            'marking'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'product_type_id'       => array('Id', 'allowEmpty' => true),
            'implementation_type_id' => array('Id', 'allowEmpty' => true),
            'country'               => array(array('StringLength', 0, 2), 'allowEmpty' => true),
            'condition'             => array(array('InArray', array('NEW','SHOWCASE','ILLIQUID','USED')), 'allowEmpty' => true),
            'purpose'               => array(array('InArray', array('COMMON','SEMI-INDUSTRIAL','INDUSTRIAL')), 'allowEmpty' => true),
            'input_cooling'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'input_heating'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'output_cooling'        => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'output_heating'        => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'square'                => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'volume'                => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'warranty'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'warranty'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'storage'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'reserve'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'order'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'order'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'measure'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'price'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true)
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

    public function update(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'id'                    => array('Id', 'presence' => 'required'),
            'group_id'              => array('Id', 'allowEmpty' => true),
            'name_id'               => array('Id', 'allowEmpty' => true),
            'mark_id'               => array('Id', 'allowEmpty' => true),
            'marking'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'product_type_id'       => array('Id', 'allowEmpty' => true),
            'implementation_type_id' => array('Id', 'allowEmpty' => true),
            'country'               => array(array('StringLength', 0, 2), 'allowEmpty' => true),
            'condition'             => array(array('InArray', array('NEW','SHOWCASE','ILLIQUID','USED')), 'allowEmpty' => true),
            'purpose'               => array(array('InArray', array('COMMON','SEMI-INDUSTRIAL','INDUSTRIAL')), 'allowEmpty' => true),
            'input_cooling'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'input_heating'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'output_cooling'        => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'output_heating'        => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'square'                => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'volume'                => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'warranty'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'warranty'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'storage'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'reserve'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'order'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'order'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'measure'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'price'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true)
        ), $params);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
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
}