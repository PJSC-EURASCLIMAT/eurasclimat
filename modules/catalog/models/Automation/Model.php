<?php

class Catalog_Automation_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table       = new Catalog_Automation_Table();
        $this->_structure   = new Catalog_Automation_Structure();
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
                array('groups' => 'catalog_automation_groups'),
                'groups.id=c.group_id',
                array(
                     'group_name' => 'groups.name'
                )
            )
            ->joinLeft(
                array('product_types' => 'catalog_automation_product_types'),
                'product_types.id=c.product_type_id',
                array(
                     'product_type_name' => 'product_types.name'
                )
            )
            ->joinLeft(
                array('implementation_types' => 'catalog_automation_implementation_types'),
                'implementation_types.id=c.implementation_type_id',
                array(
                     'implementation_type_name' => 'implementation_types.name'
                )
            )
            ->joinLeft(
                array('control_types' => 'catalog_automation_control_types'),
                'control_types.id=c.control_type_id',
                array(
                     'control_type_name' => 'control_types.name'
                )
            )
            ->joinLeft(
                array('connection_types' => 'catalog_automation_connection_types'),
                'connection_types.id=c.connection_type_id',
                array(
                     'connection_type_name' => 'connection_types.name'
                )
            )
            ->joinLeft(
                array('protection_types' => 'catalog_automation_protection_types'),
                'protection_types.id=c.protection_type_id',
                array(
                     'protection_type_name' => 'protection_types.name'
                )
            )
            ->joinLeft(
                array('power_sources' => 'catalog_automation_power_sources'),
                'power_sources.id=c.power_source_id',
                array(
                     'power_source_name' => 'power_sources.name'
                )
            )
            ->joinLeft(
                array('materials' => 'catalog_automation_materials'),
                'materials.id=c.material_id',
                array(
                     'material_name' => 'materials.name'
                )
            )
            ->joinLeft(
                array('isolation_types' => 'catalog_automation_isolation_types'),
                'isolation_types.id=c.isolation_type_id',
                array(
                     'isolation_type_name' => 'isolation_types.name'
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
}