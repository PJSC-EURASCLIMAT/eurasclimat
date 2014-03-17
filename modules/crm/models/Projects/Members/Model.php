<?php

class Crm_Projects_Members_Model
{
    protected $_table;

    public function __construct()
    {
        $this->_table = new Crm_Projects_Members_Table();
    }

    public function get($id)
    {
        $id = intval($id);
        $response = new Xend_Response();
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }
        try {
            $res = $this->_table->fetchAll(array('project_id = (?)' => $id));
            $rows = $res->toArray();
        } catch (Exception $e) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }
        $response->setRowset($rows);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    public function update(array $params)
    {
        $response = new Xend_Response();
        $validator = new Xend_Validate_Id();
        $id = intval($params['id']);
        if (!$validator->isValid($id)) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        // Ensure if project exist
        $table = new Crm_Projects_Table();
        $project = $table->findOne($id);
        if (false === $project) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }
        if (null === $project) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        // Delete all members for this project
        $this->_table->delete(array('project_id = (?)' => $id));

        // Insert members
        foreach (array('customer', 'manager', 'projector', 'logistic', 'productor') as $role) {

            if (isset($params[$role])) {

                foreach ($params[$role] as $account_id) {

                    if (!$validator->isValid($account_id)) continue;

                    try {
                        $this->_table->insert(array(
                            'project_id'    => $id,
                            'account_id'    => $account_id,
                            'role'          => $role
                        ));
                    } catch(Exception $e) {}
                }
            }
        }

        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}