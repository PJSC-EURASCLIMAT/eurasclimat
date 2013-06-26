<?php

class Catalog_Airing_Model
{
    protected $_table;

    protected $_marksResource;

    public function __construct()
    {
        $this->_table = new Catalog_Airing_Table();
        $this->_marksResource =
            (string) Xend_Acl_Resource_Generator::getInstance()->catalog->airing->marks;
    }

    public function getList($params)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(array('i' => $this->_table->getTableName()));

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        if ($this->_isMarksEnabled()) {
            $marks = $this->_getAllowedMarks();
            $select->where('mark_id IN (?)', $marks);
        }

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
            'mark_id'               => array('Id', 'allowEmpty' => true),
            'marking'               => array(array('StringLength', 1, 255), 'allowEmpty' => false)
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
            'isolation_class_id'    => array('Id', 'allowEmpty' => true),
            'country'               => array(array('StringLength', 0, 2), 'allowEmpty' => true),
            'temp'                  => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'power_supply'          => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'heating_power_consumption' => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'amperage'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'sensor_inputs'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'pressure'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'noise_level_min'       => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'eer'                   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'weight'                => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'dimensions'            => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'cable_length'          => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'pipe_diameter'         => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'speed'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'air_flow'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'warranty'              => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'storage'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'reserve'               => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'order'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'url'                   => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'price'                 => array(array('StringLength', 0, 255), 'allowEmpty' => true),
            'mount_price'           => array(array('StringLength', 0, 255), 'allowEmpty' => true),
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


    /*
     *  Private functions
     */

    private function _isMarksEnabled()
    {
        $acl = Xend_Accounts_Prototype::getAcl();
        return $acl->isAllowed($this->_marksResource, Xend_Acl_Privilege::VIEW);
    }

    /**
     * Marks wich allowed for current user
     *
     * @return array()
     */
    private function _getAllowedMarks()
    {
        $resourcesModel = new Xend_Acl_Resource();
        $acl = Xend_Accounts_Prototype::getAcl();

        $resources = $resourcesModel->fetchByParentId($this->_marksResource);

        $marks = array();
        foreach($resources->rows as $res) {
            if ($acl->isAllowed($res['id'], Xend_Acl_Privilege::VIEW)) {
                $marks[] = intval($res['name']);
            }
        }

        return $marks;
   }
}