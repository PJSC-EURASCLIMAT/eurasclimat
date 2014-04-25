<?php

class Catalog_Watersupply_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table = new Catalog_Watersupply_Table();
        $this->_marksResource =
            (string) Xend_Acl_Resource_Generator::getInstance()->catalog->watersupply->marks;
    }

    public function getInfo($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        $select = $this->_table->getAdapter()->select()
            ->from(array('c' => $this->_table->getTableName()))
            ->joinLeft(
                array('product_types' => 'catalog_watersupply_product_types'),
                'product_types.id=c.product_type_id',
                array(
                     'product_type_name' => 'product_types.name'
                )
            )
            ->joinLeft(
                array('implementation_types' => 'catalog_watersupply_implementation_types'),
                'implementation_types.id=c.implementation_type_id',
                array(
                     'implementation_type_name' => 'implementation_types.name'
                )
            )
            ->joinLeft(
                array('control_types' => 'catalog_watersupply_control_types'),
                'control_types.id=c.control_type_id',
                array(
                     'control_type_name' => 'control_types.name'
                )
            )
            ->joinLeft(
                array('connection_types' => 'catalog_watersupply_connection_types'),
                'connection_types.id=c.connection_type_id',
                array(
                     'connection_type_name' => 'connection_types.name'
                )
            )
            ->joinLeft(
                array('protection_types' => 'catalog_watersupply_protection_types'),
                'protection_types.id=c.protection_type_id',
                array(
                     'protection_type_name' => 'protection_types.name'
                )
            )
            ->joinLeft(
                array('power_sources' => 'catalog_watersupply_power_sources'),
                'power_sources.id=c.power_source_id',
                array(
                     'power_source_name' => 'power_sources.name'
                )
            )
            ->joinLeft(
                array('materials' => 'catalog_watersupply_materials'),
                'materials.id=c.material_id',
                array(
                     'material_name' => 'materials.name'
                )
            )
            ->joinLeft(
                array('marks' => 'catalog_marks'),
                'marks.id=c.mark_id',
                array(
                     'mark_name' => 'marks.name'
                )
            )
            ->where("c.id = ?", $id);

        try {
            $row = $select->query()->fetch();
            if ( empty( $row ) ) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }

            $response->setRow($row);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function update(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'             => 'StringTrim'
        ), array(
            'id'                    => array('Id', 'presence' => 'required'),
            'group_id'              => array('Id', 'allowEmpty' => true),
            'mark_id'               => array('Id', 'allowEmpty' => true),
            'marking'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'code'                  => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'product_type_id'       => array('Id', 'allowEmpty' => true),
            'implementation_type_id' => array('Id', 'allowEmpty' => true),
            'control_type_id'       => array('Id', 'allowEmpty' => true),
            'connection_type_id'    => array('Id', 'allowEmpty' => true),
            'protection_type_id'    => array('Id', 'allowEmpty' => true),
            'material_id'           => array('Id', 'allowEmpty' => true),
            'power_source_id'       => array('Id', 'allowEmpty' => true),
            'country'               => array(array('StringLength', 0, 2), 'allowEmpty' => true),
            'temp'                  => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'power_supply'          => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'watersupply_power_consumption' => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'amperage'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'sensor_inputs'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'pressure'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'noise_level_min'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'filters_performance'   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'performance'           => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'pollution_size'        => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'eer'                   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'weight'                => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'dimensions'            => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'cable_length'          => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'pipe_diameter'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'delivery_height'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'immersion_depth'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'warranty'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'url'                   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'price'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'description'           => array(array('StringLength', 0, 204800), 'allowEmpty' => true)
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
}