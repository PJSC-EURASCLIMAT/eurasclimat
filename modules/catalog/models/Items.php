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

        $row = $this->_table->findOne($id);
        if (!$row) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }
        $response->setRow($row->toArray());
        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }

    public function add(array $params)
    {
        $f = new OSDN_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'sku'       => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'model'     => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'title_id'              => array('Id', 'presence' => 'required'),
            'mark_id'               => array('Id', 'allowEmpty' => true),
            'product_type_id'       => array('Id', 'allowEmpty' => true),
            'construction_type_id'  => array('Id', 'allowEmpty' => true),
            'territoriality_id'     => array('Id', 'allowEmpty' => true),
            'condition_id'          => array('Id', 'allowEmpty' => true),
            'purpose_id'            => array('Id', 'allowEmpty' => true),
            'availability_id'       => array('Id', 'allowEmpty' => true),
            'system_type_id'        => array('Id', 'allowEmpty' => true),
            'served_square'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'served_capacity'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'cooling_power'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'heating_power'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'drying_intensity'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'air_flow_rate'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'power_consumption_in_cooling_mode'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'power_consumption_in_heating_mode'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'cooling_energy_efficiency'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'heating_energy_efficiency'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'power_supply'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'refrigerant'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'interblock_communications_length'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'differential_interconnects_heights'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'drainage_pump'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'winter_set'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'noise_level'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'manufacturer_warranty'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'stock'     => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'reserve'   => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'order'     => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'measure'   => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'price'     => array(array('StringLength', 1, 255), 'allowEmpty' => true)
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
            'id'        => array('Id', 'presence' => 'required'),
            'sku'       => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'model'     => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'title_id'              => array('Id', 'presence' => 'required'),
            'mark_id'               => array('Id', 'allowEmpty' => true),
            'product_type_id'       => array('Id', 'allowEmpty' => true),
            'construction_type_id'  => array('Id', 'allowEmpty' => true),
            'territoriality_id'     => array('Id', 'allowEmpty' => true),
            'condition_id'          => array('Id', 'allowEmpty' => true),
            'purpose_id'            => array('Id', 'allowEmpty' => true),
            'availability_id'       => array('Id', 'allowEmpty' => true),
            'system_type_id'        => array('Id', 'allowEmpty' => true),
            'served_square'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'served_capacity'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'cooling_power'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'heating_power'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'drying_intensity'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'air_flow_rate'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'power_consumption_in_cooling_mode'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'power_consumption_in_heating_mode'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'cooling_energy_efficiency'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'heating_energy_efficiency'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'power_supply'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'refrigerant'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'interblock_communications_length'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'differential_interconnects_heights'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'drainage_pump'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'winter_set'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'noise_level'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'manufacturer_warranty'
                => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'stock'     => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'reserve'   => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'order'     => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'measure'   => array(array('StringLength', 1, 255), 'allowEmpty' => true),
            'price'     => array(array('StringLength', 1, 255), 'allowEmpty' => true)
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

        $res = $this->_table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new OSDN_Status(OSDN_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new OSDN_Status(OSDN_Status::OK));
    }
}