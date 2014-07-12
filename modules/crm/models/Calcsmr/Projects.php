<?php

class Crm_Calcsmr_Projects
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Calcsmr_ProjectsTable();
    }

    public function getList($project_id)
    {
        $project_id = intval($project_id);

        $response = new Xend_Response();

        if ($project_id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
        }

        $table = new Crm_Calcsmr_Table();
        $project = $table->findOne($project_id);

        if (NULL === $project || false === $project) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'project_id'));
        }

        $projectData = $project->toArray();

        $select = $this->_table->getAdapter()->select()
            ->from(array('c' => $this->_table->getTableName()))
            ->columns(array(
                'system_sum' => new Zend_Db_Expr('(SELECT SUM(price * qty) as system_sum FROM calcsmr_systems WHERE system_id=c.id)'),
                'related' => new Zend_Db_Expr('(SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_related'),
                'related_system_sum_total' => new Zend_Db_Expr('(SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id)
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_related'),
                'compensation' => new Zend_Db_Expr('(SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation'),
                'amortisation' => new Zend_Db_Expr('(SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_amortisation'),
                'overheads' => new Zend_Db_Expr('(SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_overheads'),
                'estimated' => new Zend_Db_Expr('(SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_estimated'),
                'total' => new Zend_Db_Expr('(SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id)
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_related
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_amortisation
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_overheads
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_estimated'),
                'vat' => new Zend_Db_Expr('k_vat * ((SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id)
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_related
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_amortisation
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_overheads
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_estimated)'),
                'vat_total' => new Zend_Db_Expr('k_vat * ((SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id)
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_related
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_amortisation
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_overheads
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_estimated)
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id)
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_related
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_amortisation
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_overheads
                           + (SELECT SUM(price * qty) FROM calcsmr_systems WHERE system_id=c.id) * k_compensation * k_estimated')
            ))
            ->where('c.project_id = (?)', $project_id);
//            die($select->assemble());

        try {
            $rows = $select->query()->fetchAll();
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return $response->addStatus(Xend_Status::DATABASE_ERROR);
        }

        $compensation = 0;
        foreach ($rows as $row) {
            $compensation += $row['compensation'];
        }
        $compensation = $compensation * $projectData['k_compensation'];
        $overheads = $compensation * $projectData['k_overheads'];
        $estimated = $compensation * $projectData['k_estimated'];
        $total = $compensation + $overheads + $estimated;
        $vat = $total * $projectData['k_vat'];
        $vat_total = $total + $vat;

        $rows[] = array(
            'id'                        => NULL,
            'project_id'                => $project_id,
            'system_name'               => 'ПНР',
            'k_related'                 => 0,
            'k_compensation'            => $projectData['k_compensation'],
            'k_amortisation'            => 0,
            'k_overheads'               => $projectData['k_overheads'],
            'k_estimated'               => $projectData['k_estimated'],
            'k_vat'                     => $projectData['k_vat'],
            'system_sum'                => 0,
            'related'                   => 0,
            'related_system_sum_total'  => 0,
            'compensation'              => $compensation,
            'amortisation'              => 0,
            'overheads'                 => $overheads,
            'estimated'                 => $estimated,
            'total'                     => $total,
            'vat'                       => $vat,
            'vat_total'                 => $vat_total
        );

        $response->setRowset($rows);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function add(array $params)
    {
        $f = new Xend_Filter_Input(array(
            '*'                 => 'StringTrim'
        ), array(
            'project_id'        => array(array('Id'), 'allowEmpty' => false),
            'system_name'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_related'         => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_compensation'    => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_amortisation'    => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_overheads'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_estimated'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_vat'             => array(array('StringLength', 1, 255), 'allowEmpty' => false)
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

    public function update($data)
    {
        $f = new Xend_Filter_Input(array(
            '*'                 => 'StringTrim'
        ), array(
            'id'                => array(array('Id'), 'allowEmpty' => false),
            'system_name'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_related'         => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_compensation'    => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_amortisation'    => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_overheads'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_estimated'       => array(array('StringLength', 1, 255), 'allowEmpty' => false),
            'k_vat'             => array(array('StringLength', 1, 255), 'allowEmpty' => false)
        ), $data);

        $response = new Xend_Response();

        $response->addInputStatus($f);
        if ($response->hasNotSuccess()) {
            return $response;
        }

        $data = $f->getData();
        unset($data['project_id']);

        $id = $this->_table->updateByPk($data, $f->id);
        if (!$id) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function delete($data)
    {
        $response = new Xend_Response();

        $data = Zend_Json::decode($data);

        $id = intval($data['id']);

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