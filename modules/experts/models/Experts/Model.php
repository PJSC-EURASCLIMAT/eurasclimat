<?php

class Experts_Experts_Model
{
    /**
     * The role table object
     *
     * @var Xend_Acl_Table_Roles
     */
    protected $_table;

    public function __construct()
    {
        $this->_table = new Experts_Experts_Table();
    }

    public function getBy($params)
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('d' => $this->_table->getTableName()),
                array(
                    'd.id', 'd.name', 'd.project_id',
                    'type_id' => 't.id',
                    'type' => 't.name'
                )
            )
            ->joinLeft(
                array('t' => 'doc_types'),
                't.id=d.type_id', null
            );

        $plugin = new Xend_Db_Plugin_Select($this->_table, $select);
        $plugin->parse($params);

        if (isset($params['project_id']) && !empty($params['project_id'])) {
            $params['project_id'] = intval($params['project_id']);
            if ($params['project_id']==0) {
                return $response->addStatus(new Xend_Status(
                    Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
            }
            $select->where('d.project_id=?', $params['project_id']);
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

    public function update($data)
    {
        $response = new Xend_Response();

        unset($data['date_update']);
        unset($data['date_create']);

        $f = new Xend_Filter_Input(array(
            'id'        => 'int',
            'name'      => 'StringTrim',
            'desc'      => 'StringTrim',
//            'city_id'   => 'int',
//            'status_id'   => 'int',
//            'equip_id'   => 'int',
        ), array(
            'id'    => array('int', 'presence' => 'required'),
            'name'       => array('StringLength'),
            'desc'       => array('StringLength'),
//            'city_id'    => array('int', 'presence' => 'required'),
//            'status_id'    => array('int', 'presence' => 'required'),
//            'equip_id'    => array('int', 'presence' => 'required'),
        ), $data);

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $rows = $this->_table->updateByPk($f->getData(), $f->id);
        $status = Xend_Status::retrieveAffectedRowStatus($rows);
        return $response->addStatus(new Xend_Status($status));
    }

    public function add($data)
    {
        $response = new Xend_Response();


        unset($data['date_update']);
        unset($data['date_create']);
        unset($data['author_id']);

        $data['author_id'] = Xend_Accounts_Prototype::getId();

        $f = new Xend_Filter_Input(array(
            'name'          => 'StringTrim',
            'desc'          => 'StringTrim',
        ), array(
            'name'          => array('StringLength'),
            'desc'          => array('StringLength'),
        ), $data);



        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        try {
            $id = $this->_table->insert($f->getData());
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
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

    public function getAll()
    {
        $response = new Xend_Response();

        $select = $this->_table->getAdapter()->select()
            ->from(
                array('e' => $this->_table->getTableName()),
                array( 'e.id', 'e.name', 'e.city_id', 'e.status_id', 'e.equip_id')
            )
            ->joinLeft(
                array('st' => 'experts_statuses'),
                'st.id=e.status_id',
                array('status' => 'st.name')
            )
            ->joinLeft(
                array('eq' => 'experts_equipment'),
                'eq.id=e.equip_id',
                array('equipment' => 'eq.name')
            )
            ->joinLeft(
                array('c' => 'cities'),
                'c.id=e.city_id',
                array('city' => 'c.name')
            )
            ->joinLeft(
                array('co' => 'countries'),
                'co.id=c.country_id',
                array('country' => 'co.name')
            );

        try {
            $rows = $select->query()->fetchAll();
            if(count($rows) == 0) {
                return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
            }
            $response->setRowset($rows[0]);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Status::DATABASE_ERROR;
        }
        return $response->addStatus(new Xend_Status($status));
    }

}