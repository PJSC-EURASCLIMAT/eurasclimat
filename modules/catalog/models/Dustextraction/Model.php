<?php

class Catalog_Dustextraction_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table = new Catalog_Dustextraction_Table();
        $this->_marksResource =
            (string) Xend_Acl_Resource_Generator::getInstance()->catalog->dustextraction->marks;
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
                array('groups' => 'catalog_dustextraction_groups'),
                'groups.id=c.group_id',
                array(
                     'group_name' => 'groups.name'
                )
            )
            ->joinLeft(
                array('f' => 'catalog_dustextraction_filtrations'),
                'f.id=c.filtration_id',
                array(
                     'filtration_name' => 'f.name'
                )
            )
            ->joinLeft(
                array('m' => 'catalog_dustextraction_motors'),
                'm.id=c.motor_id',
                array(
                     'motor_name' => 'm.name'
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
            'filtration_id'         => array('Id', 'allowEmpty' => true),
            'motor_id'              => array('Id', 'allowEmpty' => true),
            'country'               => array(array('StringLength', 0, 2), 'allowEmpty' => true),
            'power_consumption'     => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'vacuum_power'          => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'air_flow'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'vacuum_pressure'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'noise_level'           => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'amperage'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'dimensions'            => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'max_remote_pneumo_valve' => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'max_riser_height'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'max_cabling_length'    => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'riser_diameter'        => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'cabling_diameter'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'dust_tank'             => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'motor_resource'        => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'max_users'             => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'extra_case_valve'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'soft_start'            => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'clean_pipe'            => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'vacuum_power_adj'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'case_lcd'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'regulating_valve'      => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'downy_valve'           => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'auto_clean'            => array(array('StringLength', 0, 255), 'allowEmpty' => true),
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