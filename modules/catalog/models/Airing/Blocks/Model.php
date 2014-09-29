<?php

class Catalog_Airing_Blocks_Model extends Catalog_ModelAbstract
{
    public function __construct()
    {
        $this->_table       = new Catalog_Airing_Blocks_Table();
        $this->_structure   = new Catalog_Airing_Blocks_Structure();
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
                array('connection_types' => 'catalog_airing_connection_types'),
                'connection_types.id=c.connection_type_id',
                array(
                     'connection_type_name' => 'connection_types.name'
                )
            )
            ->joinLeft(
                array('control_types' => 'catalog_airing_control_types'),
                'control_types.id=c.control_type_id',
                array(
                     'control_type_name' => 'control_types.name'
                )
            )
            ->joinLeft(
                array('groups' => 'catalog_airing_groups'),
                'groups.id=c.group_id',
                array(
                     'group_name' => 'groups.name'
                )
            )
            ->joinLeft(
                array('implementation_types' => 'catalog_airing_implementation_types'),
                'implementation_types.id=c.implementation_type_id',
                array(
                     'implementation_type_name' => 'implementation_types.name'
                )
            )
            ->joinLeft(
                array('isolation_clases' => 'catalog_airing_isolation_clases'),
                'isolation_clases.id=c.isolation_class_id',
                array(
                     'isolation_class_name' => 'isolation_clases.name'
                )
            )
            ->joinLeft(
                array('materials' => 'catalog_airing_materials'),
                'materials.id=c.material_id',
                array(
                     'material_name' => 'materials.name'
                )
            )
            ->joinLeft(
                array('power_sources' => 'catalog_airing_power_sources'),
                'power_sources.id=c.power_source_id',
                array(
                     'power_source_name' => 'power_sources.name'
                )
            )
            ->joinLeft(
                array('marks' => 'catalog_marks'),
                'marks.id=c.mark_id',
                array(
                     'mark_name' => 'marks.name'
                )
            )
            ->joinLeft(
                array('product_types' => 'catalog_airing_product_types'),
                'product_types.id=c.product_type_id',
                array(
                     'product_type_name' => 'product_types.name'
                )
            )
            ->joinLeft(
                array('protection_types' => 'catalog_airing_protection_types'),
                'protection_types.id=c.protection_type_id',
                array(
                     'protection_type_name' => 'protection_types.name'
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