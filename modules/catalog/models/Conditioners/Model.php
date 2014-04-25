<?php

class Catalog_Conditioners_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table = new Catalog_Conditioners_Table();
        $this->_marksResource =
            (string) Xend_Acl_Resource_Generator::getInstance()->catalog->conditioners->marks;
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
                array('groups' => 'catalog_conditioners_groups'),
                'groups.id=c.group_id',
                array(
                     'group_name' => 'groups.name'
                )
            )
            ->joinLeft(
                array('product_types' => 'catalog_conditioners_product_types'),
                'product_types.id=c.product_type_id',
                array(
                     'product_type_name' => 'product_types.name'
                )
            )
            ->joinLeft(
                array('implementation_types' => 'catalog_conditioners_implementation_types'),
                'implementation_types.id=c.implementation_type_id',
                array(
                     'implementation_type_name' => 'implementation_types.name'
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
            'currency_id'           => array('Id', 'allowEmpty' => true),
            'mark_id'               => array('Id', 'allowEmpty' => true),
            'marking'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'name'                  => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'code'                  => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'product_type_id'       => array('Id', 'allowEmpty' => true),
            'implementation_type_id'    => array('Id', 'allowEmpty' => true),
            'power_source_id'       => array('Id', 'allowEmpty' => true),
            'heatingcooling_id'     => array('Id', 'allowEmpty' => true),
            'country'               => array(array('StringLength', 0, 2), 'allowEmpty' => true),
            'cooling_capacity'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'heating_capacity'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'air_consumption_min'   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'air_consumption_max'   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'noise_level_min'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'noise_level_max'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'dimensions'            => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'warranty'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'seer'                  => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'scop'                  => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'ports'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'sound_power_level'     => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'working_amperage'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'operating_amperage'    => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'max_working_amperage'  => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'factory_refrigerant_charge'    => array(array('StringLength', 0, 255), 'allowEmpty' => true),
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